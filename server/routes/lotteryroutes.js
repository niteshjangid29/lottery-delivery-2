const express = require("express");
const lotterycontroller = require("../controllers/lotterycontroller");
const router = express.Router();

router.get("/lottery", lotterycontroller.getalllottery);
router.get("/search", lotterycontroller.searchLottery);

module.exports = router;
