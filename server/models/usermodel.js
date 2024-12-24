const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
