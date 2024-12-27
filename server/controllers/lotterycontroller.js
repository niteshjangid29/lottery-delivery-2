const Lotteryschema = require("../models/lotterymodel");
const Retailer = require("../models/retailermodel");
const dotenv = require("dotenv");
// const JWT = require("jsonwebtoken");
dotenv.config({ path: "./../config.env" });
exports.getalllottery = async (req, res) => {
  try {
    const lotteries = await Lotteryschema.find();
    res.status(200).json({
      data: {
        lotteries: lotteries,
      },
      messege: "all lotteries found",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error While fetching lotteries",
      error: err,
    });
  }
};

exports.searchLottery = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    const lotteries = await Lotteryschema.find({
      name: { $regex: search, $options: "i" },
      // prizes: { $regex: search, $options: "i" },
      // ispublished: true,
    });
    console.log(lotteries);
    res.status(200).json({
      data: {
        lotteries,
      },
      message: "Lottery found by search term",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error searching lotteries",
      error: error.message,
    });
  }
};
exports.updatelotteries = async (req, res) => {
  try {
    const { lotteries, ID } = req.body;
    const lotteryIds = lotteries.map((lottery) => lottery.id); // Extract IDs from req.body
    console.log("Lotteries", lotteries);
    console.log("ID", lotteryIds);

    // Find lotteries in the database with matching IDs
    const matchedLotteries = await Lotteryschema.find({
      _id: { $in: lotteryIds },
    });

    let retailer = null;
    let matchedRetailerLotteries = [];

    if (ID && ID !== "Admin") {
      retailer = await Retailer.findById(ID).populate("lotteries");
      if (retailer) {
        matchedRetailerLotteries = retailer.lotteries;
        console.log("Retailer Lotteries", matchedRetailerLotteries);

        for (const lottery of lotteries) {
          const matchedLottery = matchedRetailerLotteries.find(
            (dbLottery) => dbLottery._id.toString() === lottery.id
          );

          if (matchedLottery) {
            // Update or add to soldTickets
            lottery.tickets.forEach((incomingTicket) => {
              const existingEntry = matchedLottery.soldTickets.find(
                (soldTicket) => soldTicket.count === incomingTicket.count
              );

              if (existingEntry) {
                // Update the existing entry
                existingEntry.ticket = [
                  ...new Set([
                    ...existingEntry.ticket,
                    ...incomingTicket.ticket,
                  ]),
                ]; // Avoid duplicate tickets
              } else {
                // Add a new entry
                matchedLottery.soldTickets.push(incomingTicket);
              }
            });

            // Remove tickets from availableTickets
            matchedLottery.availableTickets = (
              matchedLottery.availableTickets || []
            )
              .map((ticketGroup) => ({
                ...ticketGroup,
                ticket: ticketGroup.ticket.filter(
                  (ticket) =>
                    !lottery.tickets.some((soldTicket) =>
                      soldTicket.ticket.includes(ticket)
                    )
                ),
              }))
              .filter((ticketGroup) => ticketGroup.ticket.length > 0); // Remove empty ticket groups
          }
        }

        // Save the updated Retailer lotteries
        retailer.lotteries = matchedRetailerLotteries; // Update the `lotteries` field
        await retailer.save(); // Save the Retailer document
        console.log("Updated Retailer Lotteries Saved!");
      }
    }

    if (!matchedLotteries.length && ID === "Admin") {
      return res.status(404).json({
        status: "error",
        message: "No matching lotteries found",
      });
    }

    if (matchedLotteries.length > 0) {
      for (const lottery of lotteries) {
        const matchedLottery = matchedLotteries.find(
          (dbLottery) => dbLottery._id.toString() === lottery.id
        );

        if (matchedLottery) {
          // Update or add to soldTickets
          lottery.tickets.forEach((incomingTicket) => {
            const existingEntry = matchedLottery.soldTickets.find(
              (soldTicket) => soldTicket.count === incomingTicket.count
            );

            if (existingEntry) {
              // Update the existing entry
              existingEntry.ticket = [
                ...new Set([...existingEntry.ticket, ...incomingTicket.ticket]),
              ]; // Avoid duplicate tickets
            } else {
              // Add a new entry
              matchedLottery.soldTickets.push(incomingTicket);
            }
          });

          // Remove tickets from availableTickets
          matchedLottery.availableTickets = (
            matchedLottery.availableTickets || []
          )
            .map((ticketGroup) => ({
              ...ticketGroup,
              ticket: ticketGroup.ticket.filter(
                (ticket) =>
                  !lottery.tickets.some((soldTicket) =>
                    soldTicket.ticket.includes(ticket)
                  )
              ),
            }))
            .filter((ticketGroup) => ticketGroup.ticket.length > 0); // Remove empty ticket groups

          // Save updated lottery to the database
          await matchedLottery.save();
        }
      }
    }

    res.status(200).json({
      status: "success",
      message: "Updated lotteries successfully",
      data: matchedLotteries,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error updating lotteries",
      error: error.message,
    });
  }
};
