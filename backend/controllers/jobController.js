const Job = require("../models/Job");

const createJobPost = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: "Job posted successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create job post" });
  }
};

module.exports = { createJobPost };
