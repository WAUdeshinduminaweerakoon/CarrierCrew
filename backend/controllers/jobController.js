const Job = require("../models/Job");
const JobSeeker = require('../models/Jobseeker');
const JobBackup = require('../models/backup/JobBackup')

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

// ✅ STATIC METHOD: Get JobSeekers who applied to employer's jobs
const getApplicantsByEmployer = async (req, res) => {
  const { employerId } = req.params;

  try {
    // Step 1: Fetch all jobs posted by the employer
    const jobs = await Job.find({ employerId });

    // Step 2: Map applicant userId => [job info...]
    const applicantJobMap = new Map();

    jobs.forEach(job => {
      job.applicants.forEach(applicant => {
        const id = applicant.userId.toString();
        if (!applicantJobMap.has(id)) {
          applicantJobMap.set(id, []);
        }
        applicantJobMap.get(id).push({
          jobId: job._id,
          jobTitle: job.jobTitle,
          appliedAt: applicant.appliedAt,
          location: job.location,
          district: job.district,
          dateFrom: job.dateFrom,
          dateTo: job.dateTo,
          timeFrom: job.timeFrom,
          timeTo: job.timeTo,
          payment: job.payment,
        });
      });
    });

    const applicantIds = Array.from(applicantJobMap.keys());

    // Step 3: Fetch JobSeeker details
    const jobSeekers = await JobSeeker.find({ _id: { $in: applicantIds } });

    // Step 4: Combine job seeker info with their applied job(s)
    const applicantsWithJobs = jobSeekers.map(js => {
      return {
        jobSeeker: js,
        appliedJobs: applicantJobMap.get(js._id.toString()) || [],
      };
    });

    res.status(200).json({ applicants: applicantsWithJobs });
  } catch (err) {
    console.error('Error fetching applicants with job info:', err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

const deleteJobPost = async (req, res) => {
  const jobId = req.params.id;

  try {

    const job = await Job.findById(jobId).lean();

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.status = "owner-delete";

    await JobBackup.create(job);

    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({ message: "Job deleted and backed up successfully" });
  } catch (error) {
    console.error("Error deleting job by owner:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update job post
const updateJobPost = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Failed to update job" });
  }
};


module.exports = {
  createJobPost,
  applyForJob,
  getApplicantsByEmployer,
  deleteJobPost,
  updateJobPost,
};
