const express = require('express');
const { sendOtpHandler, verifyOtp } = require('../controllers/otpController');
const router = express.Router();

router.post("/send-otp", sendOtpHandler);
router.post("/verify-otp", verifyOtp);

module.exports = router;