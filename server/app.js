const express = require("express");
const cors = require("cors");
const lotteryroutes = require("./routes/lotteryroutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development
      // "https://ipl-fulltoss-kfi8.vercel.app",
      // "https://ipl-fulltoss.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// app.use("/", userroutes);
app.use("/", lotteryroutes);

module.exports = app;
