const nodemailer = require("nodemailer");
const Otp = require('../models/Otp.js');


const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password
  },
});

const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();

  try {
    await Otp.deleteMany({ email }); // Remove existing OTPs
    await Otp.create({ email, otp });

    await transporter.sendMail({
      from: `"Part Time Jobs LK" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP" });
  }
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const record = await Otp.findOne({ email, otp });

  if (!record) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await Otp.deleteMany({ email });
  res.json({ success: true });
};

module.exports = {
  sendOtp,
  verifyOtp,
};
