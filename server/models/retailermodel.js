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
  drawDate: { type: String, required: true },
  prize: { type: String, required: true },
  winningAmount: { type: String, required: true },
  alltickets: { type: [ticketSchema], required: true },
  soldTickets: { type: [ticketSchema], required: true },
  availableTickets: { type: [ticketSchema], required: true },
});

const retailerSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  lotteries: { type: [LotterySchema] },
});

const Retailer = mongoose.model("Retailers", retailerSchema);

module.exports = Retailer;
