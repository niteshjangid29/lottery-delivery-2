const express = require("express");
// const authcontroller = require("../controllers/authservice");
const contactUscontroller = require("../controllers/contactUs");
const router = express.Router();
router.get("/userAllCart", contactUscontroller.userAllCart);
router.get("/userAllOrder", contactUscontroller.userAllOrder);
router.post("/userDetails", contactUscontroller.userDetails);
router.post("/userCart", contactUscontroller.userCart);
router.post("/userOrder", contactUscontroller.userOrder);
router.post("/contactus", contactUscontroller.contactUs);

// router.get("/authcheck", authcontroller.checkaccesstoken);

// router.post("/authcheck/refresh", authcontroller.refreshAccessToken);
module.exports = router;
