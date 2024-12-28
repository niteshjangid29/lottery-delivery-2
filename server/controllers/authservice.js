// const JWT = require("jsonwebtoken");
// const userSchema = require("../models/usermodel");
// const dotenv = require("dotenv");
// const { promisify } = require("util");

// dotenv.config({ path: "./../config.env" });

// exports.loginWithPhone = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;

//     if (!phoneNumber) {
//       return res.status(400).json({ message: "Phone number is required" });
//     }

//     // Find user by phone number
//     const currentUser = await userSchema.findOne({ phone: phoneNumber });
//     if (!currentUser) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     // Create JWT access token
//     const accessToken = JWT.sign(
//       { id: currentUser._id },
//       process.env.ACCESS_JWT_SECRET,
//       { expiresIn: process.env.ACCESS_JWT_EXPIRES_IN }
//     );

//     // Create JWT refresh token
//     const refreshToken = JWT.sign(
//       { id: currentUser._id },
//       process.env.REFRESH_JWT_SECRET,
//       { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN }
//     );

//     // Send both tokens to the client
//     res.status(200).json({
//       status: "success",
//       message: "Login successful",
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "An error occurred during login" });
//   }
// };

// exports.checkAccessToken = async (req, res, next) => {
//   try {
//     let token;
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "Token is missing." });
//     }

//     // Decode access token and verify
//     const decoded = await promisify(JWT.verify)(
//       token,
//       process.env.ACCESS_JWT_SECRET
//     );

//     const currentUser = await userSchema.findById(decoded.id);
//     if (!currentUser) {
//       return res.status(401).json({ message: "User does not exist." });
//     }

//     if (currentUser.changedPasswordAfter(decoded.iat)) {
//       return res.status(401).json({ message: "Token session expired" });
//     }

//     res.status(200).json({
//       status: "success",
//       message: "Login successful!",
//       user: currentUser,
//     });
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// exports.refreshAccessToken = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(401).json({ message: "Refresh token is required" });
//     }

//     // Verify refresh token
//     const decoded = await promisify(JWT.verify)(
//       refreshToken,
//       process.env.REFRESH_JWT_SECRET
//     );

//     const currentUser = await userSchema.findById(decoded.id);
//     if (!currentUser) {
//       return res.status(401).json({ message: "User not found" });
//     }
//     const newAccessToken = JWT.sign(
//       { id: currentUser._id },
//       process.env.ACCESS_JWT_SECRET,
//       { expiresIn: process.env.ACCESS_JWT_EXPIRES_IN }
//     );

//     res.status(200).json({
//       status: "success",
//       accessToken: newAccessToken,
//     });
//   } catch (error) {
//     res.status(403).json({ message: "Invalid or expired refresh token" });
//   }
// };
