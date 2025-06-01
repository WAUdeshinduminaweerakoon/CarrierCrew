const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');
const Job = require('../models/Job');

// Get total employer count
const getTotalEmployerCount = async (req, res) => {
  try {
    const count = await Employer.countDocuments();
    res.status(200).json({ totalEmployers: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get total jobseeker count
const getTotalJobseekerCount = async (req, res) => {
  try {
    const count = await JobSeeker.countDocuments();
    res.status(200).json({ totalJobSeekers: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get total job count
const getTotalJobCount = async (req, res) => {
  try {
    const count = await Job.countDocuments();
    res.status(200).json({ totalJobs: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get total applicant count (sum of all applicants across jobs)
const getTotalApplicantCount = async (req, res) => {
  try {
    const result = await Job.aggregate([
      {
        $project: {
          applicantCount: {
            $size: { $ifNull: ["$applicants", []] }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalApplicants: { $sum: "$applicantCount" }
        }
      }
    ]);

    const totalApplicants = result[0]?.totalApplicants || 0;
    res.status(200).json({ totalApplicants });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  getTotalEmployerCount,
  getTotalJobseekerCount,
  getTotalJobCount,
  getTotalApplicantCount,
};
