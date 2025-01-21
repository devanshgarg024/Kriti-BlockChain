const express = require("express");
const router = express.Router();
// const { generateAndSendOtpMail, verifyOtpMail } = require("../Controllers/mailotpController");
// const { generateAndSendOtpText, verifyOtpText } = require("../Controllers/textotpController");
const { mailotp, verifyOtp } = require("../Controllers/mailotpController");

router.post("/send", mailotp); // Route to send OTP
router.post("/verify", verifyOtp); // Route to send OTP
// router.post("/verifyMailOTP", verifyOtpMail); // Route to verify OTP
// router.post("/send-otp", generateAndSendOtpText); // Route to send OTP
// router.post("/verify-otp", verifyOtpText); // Route to verify OTP

module.exports = router;
