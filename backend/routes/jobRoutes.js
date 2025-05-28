const express = require("express");
const router = express.Router();
const { createJobPost } = require("../controllers/jobController");
const Job = require("../models/Job");

router.post("/new", createJobPost);

// GET /api/jobs/all
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err });
  }
});


module.exports = router;
