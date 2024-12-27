const express = require("express");
const lotterycontroller = require("../controllers/lotterycontroller");
const router = express.Router();

router.get("/lottery", lotterycontroller.getalllottery);
router.get("/search", lotterycontroller.searchLottery);
// router.post("/updatelotteries", lotterycontroller.updatelotteries);
module.exports = router;
