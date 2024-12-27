const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  retailerID: { type: String, required: true },
  // isAdmin: { type: Boolean, required: true },
  lotteryName: { type: String, required: true },
  drawDate: { type: String, required: true },
  price: { type: Number, required: true },
  tickets: [
    {
      ticket: { type: String, required: true }, // Ticket number
      count: { type: Number, required: true }, // Number of tickets for this ticket number
    },
  ],
});
const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  retailerID: { type: String, required: true },
  // isAdmin: { type: Boolean, required: true },
  lotteryName: { type: String, required: true },
  drawDate: { type: String, required: true },
  type: { type: String },
  price: { type: Number, required: true },
  tickets: [
    {
      ticket: { type: String, required: true }, // Ticket number
      count: { type: Number, required: true }, // Number of tickets for this ticket number
    },
  ],
});
const orderHistoryItemSchema = new mongoose.Schema({
  orders: [orderItemSchema],
  orderDate: { type: String, required: true },
  totalAmount: { type: Number, required: true },
});
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  address: { type: String, required: true },
  cartItems: [cartItemSchema],
  orderHistory: [orderHistoryItemSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
