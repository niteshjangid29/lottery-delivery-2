const express = require("express");
const paymentcontroller = require("../controllers/paymentcontroller");
const router = express.Router();
router.post("/create-order", paymentcontroller.payment);
module.exports = router;
