const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const ticketSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  ticket: { type: [String], required: true },
});

const LotterySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
  // type: { type: String },
  drawDate: { type: String, required: true },
  prize: { type: String, required: true },
  winningAmount: { type: String, required: true },
  alltickets: { type: [ticketSchema], required: true },
  soldTickets: { type: [ticketSchema], required: true },
  availableTickets: { type: [ticketSchema], required: true },
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
const retailerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  address: { type: String },
  rating: { type: String },
  about: { type: String },
  orderHistory: [orderHistoryItemSchema],
  lotteries: { type: [LotterySchema] },
});

const Retailer = mongoose.model("Retailers", retailerSchema);

module.exports = Retailer;
