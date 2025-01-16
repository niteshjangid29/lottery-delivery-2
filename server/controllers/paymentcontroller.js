const dotenv = require("dotenv");
dotenv.config({ path: "./../config.env" });
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.payment = async (req, res) => {
  const { amount } = req.body;
  console.log("Amount:", amount);

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    console.log(options);
    const order = await razorpay.orders.create(options);
    console.log(order);
    res
      .status(200)
      .json({ orderId: order.id, key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
