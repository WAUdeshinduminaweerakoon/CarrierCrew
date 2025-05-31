const Job = require("../models/Job");

// Create a new job post
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

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required to apply." });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const alreadyApplied = job.applicants.some(applicant =>
      applicant.userId.toString() === userId
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: "You have already applied for this job." });
    }

    job.applicants.push({ userId, appliedAt: new Date() });
    await job.save();

    res.status(200).json({ message: "Applied successfully", job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to apply for job" });
  }
};

module.exports = {
  createJobPost,
  applyForJob
};
