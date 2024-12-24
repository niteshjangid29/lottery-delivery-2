const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const cartItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
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

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  address: { type: String, required: true },
  cartItems: [cartItemSchema], // Array of cart items
});

const User = mongoose.model("User", userSchema);

module.exports = User;
