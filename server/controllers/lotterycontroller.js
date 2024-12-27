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
      messege: "all lotteries found",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error While fetching lotteries",
      error: err,
    });
  }
};

exports.searchLottery = async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    const lotteries = await Lotteryschema.find({
      name: { $regex: search, $options: "i" },
      // prizes: { $regex: search, $options: "i" },
      // ispublished: true,
    });
    console.log(lotteries);
    res.status(200).json({
      data: {
        lotteries,
      },
      message: "Lottery found by search term",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error searching lotteries",
      error: error.message,
    });
  }
};
// exports.updatelotteries = async (req, res) => {
//   try {
//     const { lotteries } = req.body;
//     console.log(lotteries);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "error",
//       message: "Error updating lotteries",
//       error: error.message,
//     });
//   }
// };
