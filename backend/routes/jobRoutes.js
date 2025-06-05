const express = require("express");
const router = express.Router();
const { createJobPost, applyForJob, getApplicantsByEmployer, deleteJobPost,updateJobPost } = require("../controllers/jobController");
const Job = require("../models/Job");
const validatePlan = require('../middleware/validatePlan'); 

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

// routes/jobRouter.js
router.get("/employer/:employerId", async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.employerId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employer's jobs", error: err });
  }
});


router.post("/:jobId/apply", applyForJob); 

// GET: All jobs by a specific employer
router.get("/employer/:employerId", async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.employerId });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employer's jobs", error: err });
  }
});

// GET job by ID
router.get('/:jobId', async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get("/employer/:employerId/applicants", getApplicantsByEmployer);

router.post('/employer/create-job', validatePlan, createJobPost);

router.delete('/:id/delete', deleteJobPost);

router.put("/edit/:jobId", updateJobPost);



module.exports = router;
