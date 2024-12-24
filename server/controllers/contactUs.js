const dotenv = require("dotenv");
const contactUs = require("../models/contactUs");
const User = require("../models/usermodel");
dotenv.config({ path: "./../config.env" });
exports.userAllCart = async (req, res) => {
  try {
    const phone = req.query.phone; // Retrieve phone number from query parameters

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
  // console.log(req.body);

  try {
    const { phone, updatedCart } = req.body;
    console.log(updatedCart.items);
    const formattedCart = updatedCart.items.map((item) => ({
      id: item.id,
      lotteryName: item.lotteryName,
      drawDate: item.drawDate,
      price: item.price,
      tickets: item.tickets.map((ticket) => ({
        ticket: ticket.ticket,
        count: ticket.count,
      })),
    }));

    const userDetails = await User.findOneAndUpdate(
      { phone },
      { cartItems: formattedCart },
      { new: true, runValidators: true }
    );

    if (!userDetails) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

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
