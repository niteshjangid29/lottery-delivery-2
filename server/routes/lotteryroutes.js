const express = require("express");
const lotterycontroller = require("../controllers/lotterycontroller");
const router = express.Router();

router.get("/lottery", lotterycontroller.getalllottery);
module.exports = router;
