const express = require("express");
const router = express.Router();
const { mailotp, verifyOtp } = require("../Controllers/mailotpController");

router.post("/send", mailotp); // Route to send OTP
router.post("/verify", verifyOtp); // Route to send OTP

module.exports = router;
