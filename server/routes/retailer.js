const express = require("express");
const retailercontroller = require("../controllers/retailercontroller");
const router = express.Router();
router.get("/retailer/:id", retailercontroller.retailerDetails);
module.exports = router;
