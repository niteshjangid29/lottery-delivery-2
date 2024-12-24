// config/config.js

const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
module.exports = {
  JWT_SECRET: process.env.ACCESS_JWT_SECRET, // Secret key for JWT (use an environment variable for production)
  JWT_EXPIRES_IN: process.env.ACCESS_JWT_EXPIRES_IN, // Expiry time for the token
};
