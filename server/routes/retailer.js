const express = require("express");
const retailercontroller = require("../controllers/retailercontroller");
const router = express.Router();
router.get("/retailersData", retailercontroller.retailersData);
router.get("/retailer/:id", retailercontroller.retailerDetails);
router.post("/retailerOrder", retailercontroller.retailerOrder);
module.exports = router;
