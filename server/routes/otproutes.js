const express = require("express");
const optcontroller = require("../controllers/optcontroller");
const router = express.Router();
router.post("/generateOtp", optcontroller.generateOtp);
router.post("/verifyOtp", optcontroller.verifyOtp);
module.exports = router;
