const dotenv = require("dotenv");
const contactUs = require("../models/contactUs");
const User = require("../models/usermodel");
dotenv.config({ path: "./../config.env" });
exports.userAllCart = async (req, res) => {
  try {
    const phone = req.query.phone;

    if (!phone) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required",
      });
    }

    const user = await User.findOne({ phone }).select("cartItems");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const cart = user.cartItems;

    res.status(200).json({
      status: "success",
      message: "Cart items fetched successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching cart items",
      error: err.message,
    });
    console.error(err);
  }
};
exports.userAllOrder = async (req, res) => {
  try {
    const phone = req.query.phone;

    if (!phone) {
      return res.status(400).json({
        status: "error",
        message: "Phone number is required",
      });
    }

    const user = await User.findOne({ phone }).select("orderHistory");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    const order = user.orderHistory;

    res.status(200).json({
      status: "success",
      message: "Order items fetched successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching cart items",
      error: err.message,
    });
    console.error(err);
  }
};

exports.userDetails = async (req, res) => {
  console.log(req.body);
  try {
    const { phone, name, email, address } = req.body;

    const userDetails = await User.findOneAndUpdate(
      { phone },
      { name, email, address },
      { new: true, runValidators: true } // Returns updated document and validates input
    );

    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User details updated successfully",
      data: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while updating user details",
      error: err.message,
    });
  }
};

exports.userCart = async (req, res) => {
  try {
    let { phone, updatedCart, ID } = req.body;
    // console.log(ID);
    if (ID === "" || ID === undefined || ID === null) {
      ID = "Admin";
    }
    const filteredItems = updatedCart.items.filter(
      (item) => item.retailerID === ID || item.retailerID === "Admin"
    );
    // let admin;
    // if (ID === undefined || ID === null || ID === "Admin") {
    //   admin = true;
    // } else {
    //   admin = false;
    // }
    const formattedCart = filteredItems.map((item) => ({
      id: item.id,
      retailerID: item.retailerID || "Admin",
      // isAdmin: admin || false,
      lotteryName: item.lotteryName,
      type: item.type,
      drawDate: item.drawDate,
      price: item.price,
      tickets: item.tickets.map((ticket) => ({
        ticket: ticket.ticket,
        count: ticket.count,
      })),
    }));
    // console.log(ID);
    const userDetails = await User.findOne({
      phone,
    });
    const filteredUserCart = userDetails.cartItems.filter(
      (item) => item.retailerID !== ID
    );
    // console.log("FilteredUserCart", filteredUserCart);
    userDetails.cartItems = [...filteredUserCart, ...formattedCart];
    // console.log("Final User Detail", userDetails);
    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    await User.findOneAndUpdate({ phone }, userDetails);
    res.status(200).json({
      status: "success",
      message: "User cart updated successfully",
      data: userDetails.cartItems,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while updating user cart",
      error: err.message,
    });
  }
};
exports.userOrder = async (req, res) => {
  try {
    const { orders, phone, totalAmount, orderDate } = req.body;
    // console.log(orders, phone, totalAmount, orderDate);

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

    const userDetails = await User.findOne({ phone });
    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const filteredUser = userDetails.orderHistory;
    // console.log("FilteredUser Orders", filteredUser);

    // Add the new order data to the user's order history
    userDetails.orderHistory = [...filteredUser, orderedData];
    console.log("Final User Detail", userDetails.orderHistory);

    // Update the user in the database
    await User.findOneAndUpdate({ phone }, userDetails, { new: true });

    res.status(200).json({
      status: "success",
      message: "User orderHistory updated successfully",
      data: userDetails.orderHistory,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while creating order",
      error: err.message,
    });
  }
};

exports.contactUs = async (req, res) => {
  console.log(req.body);

  try {
    const newContact = await contactUs.create(req.body);

    res.status(200).json({
      status: "success",
      message: "Your message has been sent successfully",
      data: {
        contact: newContact,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error while sending message",
      error: err.message,
    });
  }
};
