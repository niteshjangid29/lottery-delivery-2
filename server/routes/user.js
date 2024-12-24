const express = require("express");
const contactUscontroller = require("../controllers/contactUs");
const router = express.Router();
router.get("/userAllCart", contactUscontroller.userAllCart);
router.post("/userDetails", contactUscontroller.userDetails);
router.post("/userCart", contactUscontroller.userCart);
router.post("/contactus", contactUscontroller.contactUs);
module.exports = router;
