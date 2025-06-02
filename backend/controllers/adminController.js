const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');
const Job = require('../models/Job');
const moment = require('moment'); 

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




const getJobsLastFourMonths = async (req, res) => {
  try {
    // Calculate the start date as the first day of the month 3 months ago
    const startDate = moment().subtract(3, 'months').startOf('month').toDate();

    const counts = await Job.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    // Transform the aggregation result into a more frontend-friendly format,
    // including months with zero counts
    const result = [];
    for (let i = 3; i >= 0; i--) {
      const date = moment().subtract(i, 'months');
      const year = date.year();
      const month = date.month() + 1; // month() is zero-based
      const found = counts.find(
        c => c._id.year === year && c._id.month === month
      );
      result.push({
        year,
        month,
        count: found ? found.count : 0
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching job counts:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getUserRegistrationsLast4Months = async (req, res) => {
  try {
    const endDate = moment().endOf('month').toDate(); // current month end
    const startDate = moment().subtract(4, 'months').startOf('month').toDate(); // 4 months ago start

    // Helper function to group by month
    const groupByMonth = (data) => {
      const result = {};

      data.forEach(item => {
        const month = moment(item.createdAt).format('YYYY-MM');
        result[month] = (result[month] || 0) + 1;
      });

      return result;
    };

    // Fetch employers and jobseekers created within range
    const employers = await Employer.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).select('createdAt');

    const jobseekers = await JobSeeker.find({
      createdAt: { $gte: startDate, $lte: endDate }
    }).select('createdAt');

    const employerCounts = groupByMonth(employers);
    const jobseekerCounts = groupByMonth(jobseekers);

    // Generate a result array for the last 5 months
    const result = [];
    for (let i = 4; i >= 0; i--) {
      const month = moment().subtract(i, 'months').format('YYYY-MM');
      const label = moment().subtract(i, 'months').format('MMM'); // For chart display

      result.push({
        month: label,
        employers: employerCounts[month] || 0,
        jobseekers: jobseekerCounts[month] || 0
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Error getting user registrations:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};




module.exports = {
  getTotalEmployerCount,
  getTotalJobseekerCount,
  getTotalJobCount,
  getTotalApplicantCount,
  getJobsLastFourMonths,
  getUserRegistrationsLast4Months,
};
