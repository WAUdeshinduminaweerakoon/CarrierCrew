// backend/routes/auth.js or equivalent
const express = require("express");
const router = express.Router();
const Employer = require("../models/Employer");
const JobSeeker = require("../models/JobSeeker");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check in Employer collection
    const employer = await Employer.findOne({ username, password });
    if (employer) {
      return res.status(200).json({ userType: "Employer", userId: employer._id });
    }

    // Check in JobSeeker collection
    const jobSeeker = await JobSeeker.findOne({ username, password });
    if (jobSeeker) {
      return res.status(200).json({ userType: "JobSeeker", userId: jobSeeker._id });
    }

    // If no match
    res.status(401).json({ message: "Invalid username or password." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});



module.exports = router;
