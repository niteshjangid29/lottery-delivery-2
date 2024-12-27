const dotenv = require("dotenv");
const Retailer = require("../models/retailermodel");
dotenv.config({ path: "./../config.env" });
exports.retailersData = async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.status(200).json({
      status: "success",
      message: "Retailers Data Found",
      data: retailers,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching retailers data",
      error: err.message,
    });
    console.error(err);
  }
};
exports.retailerDetails = async (req, res) => {
  const { params } = req;
  const id = params.id;
  console.log(id);
  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Link",
      });
    }

    const retailer = await Retailer.findById(id);
    console.log(retailer);
    if (!retailer) {
      return res.status(404).json({
        status: "No Retailer found",
        message: "Invalid Link",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Retailer Details Found",
      data: retailer,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching retailer detils",
      error: err.message,
    });
    console.error(err);
  }
};
exports.retailerOrder = async (req, res) => {
  try {
    const { orders, phone, totalAmount, orderDate, ID } = req.body;
    console.log(
      "From retailerOrder",
      orders,
      phone,
      totalAmount,
      orderDate,
      ID
    );

    // Format the incoming orders
    const orderData = orders.map((item) => ({
      id: item.id,
      retailerID: item.retailerID || "Admin",
      lotteryName: item.lotteryName,
      drawDate: item.drawDate,
      type: item.type,
      price: item.price,
      tickets: item.tickets.map((ticket) => ({
        ticket: ticket.ticket,
        count: ticket.count,
      })),
    }));

    const orderedData = {
      orders: orderData,
      totalAmount: totalAmount,
      orderDate,
    };

    const retailerDetails = await Retailer.findOne({
      _id: ID,
    });
    console.log(retailerDetails);
    if (ID !== "Admin" && !retailerDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const filteredRetailer = retailerDetails.orderHistory;
    retailerDetails.orderHistory = [...filteredRetailer, orderedData];

    console.log("Final Retailer Detail", retailerDetails.orderHistory);

    await Retailer.findOneAndUpdate({ _id: ID }, retailerDetails, {
      new: true,
    });

    res.status(200).json({
      status: "success",
      message: "User orderHistory updated successfully",
      data: retailerDetails.orderHistory,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while creating order",
      error: err.message,
    });
  }
};
