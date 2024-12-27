const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });

const ticketSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  ticket: { type: [String], required: true },
});

const LotterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  drawDate: { type: String, required: true },
  prize: { type: String, required: true },
  type: { type: String },
  winningAmount: { type: String, required: true },
  alltickets: { type: [ticketSchema], required: true },
  soldTickets: { type: [ticketSchema], required: true },
  availableTickets: { type: [ticketSchema], required: true },
});
LotterySchema.index({
  name: "text",
  drawDate: "text",
  prize: "text",
});
const Lottery = mongoose.model("Lottery", LotterySchema);

module.exports = Lottery;
