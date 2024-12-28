const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const otpRoutes = require("./routes/otproutes");
const lotteryroutes = require("./routes/lotteryroutes");
const retailerRoutes = require("./routes/retailer");
const userroutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://lottery-delivery-admin.vercel.app",
      "https://lottog.shop",
      "https://lottery-delivery.vercel.app",
      "https://lottery-delivery-2-backend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests for all routes
app.options("*", cors());
app.use(bodyParser.json());

// Middleware to parse JSON request bodies
app.use(express.json());

// app.use("/", userroutes);
app.use("/", lotteryroutes);
app.use("/", userroutes);
app.use("/", otpRoutes);
app.use("/", retailerRoutes);
module.exports = app;
