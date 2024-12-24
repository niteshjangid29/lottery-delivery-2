const express = require("express");
const contactUscontroller = require("../controllers/contactUs");
const router = express.Router();
router.post("/contactus", contactUscontroller.contactUs);
module.exports = router;
