const express = require("express");
const router = express.Router();
const { loginVerifyData} = require('../Controllers/loginVerifyController');

router.post("/", loginVerifyData); // Route to send OTP

module.exports = router;
