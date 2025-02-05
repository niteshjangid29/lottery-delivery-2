const User = require("../models/usermodel");
const Otp = require("../models/otpmodel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { sendOtpViaTwilio } = require("../config/twilio");

const generateOtp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    // console.log(phoneNumber);
    const otp = crypto.randomInt(100000, 999999).toString();

    const newOtp = new Otp({
      phone: phoneNumber,
      otp,
    });
    await newOtp.save();
    console.log(newOtp);

    const response = await sendOtpViaTwilio(phoneNumber, otp);
    console.log(response);
    if (response.success) {
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    } else {
      res.status(500).json({
        success: false,
        message: "Error sending OTP",
        error: response.error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating OTP",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const otpRecord = await Otp.findOne({ phone, otp });
    console.log(otpRecord);
    if (!otpRecord) {
      return res.status(404).json({
        success: false,
        message: "Invalid or Expired OTP",
      });
    }
    const updatePhone = req.body.phone?.replace(/\s+/g, "");
    let user = await User.findOne({ phone: updatePhone });
    console.log(user);
    if (!user) {
      user = new User({ phone: updatePhone });
      await user.save();
    }

    await Otp.deleteOne({ _id: otpRecord._id });

    const token = jwt.sign(
      { userId: user._id, phone: updatePhone },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );
    // const accessToken = htw.sign(
    //       { id: currentUser._id },
    //       process.env.ACCESS_JWT_SECRET,
    //       { expiresIn: process.env.ACCESS_JWT_EXPIRES_IN }
    //     );

    //     // Create JWT refresh token
    //     const refreshToken = htw.sign(
    //       { id: currentUser._id },
    //       process.env.REFRESH_JWT_SECRET,
    //       { expiresIn: process.env.REFRESH_JWT_EXPIRES_IN }
    //     );
    console.log(token);
    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
      error: error.message,
    });
  }
};

module.exports = {
  generateOtp,
  verifyOtp,
};
