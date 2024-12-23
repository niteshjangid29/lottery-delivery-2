const Lotteryschema = require("../models/lotterymodel");
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
      messege: "all books found",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error While fetching books",
      error: err,
    });
  }
};

exports.searchBook = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    const books = await Lotteryschema.find({
      $text: { $search: search },
      ispublished: true,
    });

    res.status(200).json({
      data: {
        books,
      },
      message: "Books found by search term",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error searching books",
      error: error.message,
    });
  }
};
