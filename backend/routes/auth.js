
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Employer = require("../models/Employer");
const JobSeeker = require("../models/Jobseeker");
const { deleteEmployer, deleteJobSeeker, sendOtpForPasswordReset, verifyOtpForPasswordReset, resetPassword } = require("../controllers/authController");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Try finding the employer by username
    const employer = await Employer.findOne({ username });
    if (employer) {
      const isMatch = await bcrypt.compare(password, employer.password);
      if (isMatch) {
        return res.status(200).json({ userType: "Employer", userId: employer._id });
      } else {
        return res.status(401).json({ message: "Invalid username or password." });
      }
    }

    // Try finding the job seeker by username
    const jobSeeker = await JobSeeker.findOne({ username });
    if (jobSeeker) {
      const isMatch = await bcrypt.compare(password, jobSeeker.password);
      if (isMatch) {
        return res.status(200).json({ userType: "JobSeeker", userId: jobSeeker._id });
      } else {
        return res.status(401).json({ message: "Invalid username or password." });
      }
    }

    // If no user found
    res.status(401).json({ message: "Invalid username or password." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

router.delete("/employer/:id/delete", deleteEmployer);
router.delete("/jobseeker/:id/delete", deleteJobSeeker);
router.post("/account/recover", sendOtpForPasswordReset);
router.post("/account/recover/verify-otp", verifyOtpForPasswordReset);
router.post("/account/recover/reset-password", resetPassword);

module.exports = router;
