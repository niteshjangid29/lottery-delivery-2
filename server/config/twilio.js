// config/twilio.js
const twilio = require("twilio");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// Log the credentials for debugging (remove in production)
// console.log("TWILIO_SID:", process.env.TWILIO_SID);
// console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
// console.log("TWILIO_PHONE_NUMBER:", process.env.TWILIO_PHONE_NUMBER);

if (
  !process.env.TWILIO_SID ||
  !process.env.TWILIO_AUTH_TOKEN ||
  !process.env.TWILIO_PHONE_NUMBER
) {
  throw new Error("Missing Twilio credentials in environment variables.");
}

// Initialize Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const sendOtpViaTwilio = async (phone, otp) => {
  // console.log(phone, otp);
  try {
    const message = await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      // from: "+1 402 625 6628",
      to: phone,
    });
    // console.log(message);
    return { success: true, message: message.sid };
  } catch (error) {
    console.error("Error sending OTP via Twilio:", error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendOtpViaTwilio };
