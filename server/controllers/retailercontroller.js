const dotenv = require("dotenv");
const Retailer = require("../models/retailermodel");
dotenv.config({ path: "./../config.env" });
exports.retailerDetails = async (req, res) => {
  const { params } = req;
  const id = params.id;
  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Link",
      });
    }

    const retailer = await Retailer.findById(id);

    if (!retailer) {
      return res.status(404).json({
        status: "No Retailer found",
        message: "Invalid Link",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Retailer Details Found",
      data: retailer,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error fetching retailer detils",
      error: err.message,
    });
    console.error(err);
  }
};

// exports.userDetails = async (req, res) => {
//   console.log(req.body);
//   try {
//     const { phone, name, email, address } = req.body;

//     const userDetails = await User.findOneAndUpdate(
//       { phone },
//       { name, email, address },
//       { new: true, runValidators: true } // Returns updated document and validates input
//     );

//     if (!userDetails) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "User details updated successfully",
//       data: userDetails,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: "error",
//       message: "Error while updating user details",
//       error: err.message,
//     });
//   }
// };
