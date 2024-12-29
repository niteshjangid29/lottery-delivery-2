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

const allowedOrigins = [
  "http://localhost:3000",
  "https://lottery-delivery-admin.vercel.app",
  "https://lottog.shop",
  "https://www.lottog.shop",
  "https://lottery-delivery.vercel.app",
  "https://admin.lottog.shop",
  "https://www.admin.lottog.shop",
  "https://lottery-delivery-2-backend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

app.use(bodyParser.json());
app.use(express.json());

app.use("/", lotteryroutes);
app.use("/", userroutes);
app.use("/", otpRoutes);
app.use("/", retailerRoutes);

module.exports = app;
