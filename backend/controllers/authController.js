const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');
const EmployerBackup = require('../models/backup/EmployerBackup');
const JobSeekerBackup = require('../models/backup/JobSeekerBackup');
const Job = require('../models/Job');
const JobBackup = require('../models/backup/JobBackup');

const { sendOtp, verifyOtp } = require('./otpController');
const bcrypt = require('bcryptjs');


// Helper: Check strong password
function isStrongPassword(password) {
  const minLength = 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpper &&
    hasLower &&
    hasNumber &&
    hasSpecial
  );
}

const registerEmployer = async (req, res) => {
  try {
    const { company, username, nic, email, mobileNumber, password, ...userData } = req.body;

    // Strong password check
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      });
    }

    // Check for existing records
    const existing = await Employer.findOne({
      $or: [
        { username },
        { nic },
        { email },
        { mobileNumber }
      ]
    });

    if (existing) {
      let conflictField = 'Username';
      if (existing.nic === nic) conflictField = 'NIC';
      else if (existing.email === email) conflictField = 'Email';
      else if (existing.mobileNumber === mobileNumber) conflictField = 'Contact';

      return res.status(400).json({ message: `${conflictField} already exists` });
    }

    const newEmployer = new Employer({
      company,
      username,
      nic,
      email,
      mobileNumber,
      password,
      ...userData
    });

    await newEmployer.save();
    res.status(201).json({ message: 'Employer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const registerJobSeeker = async (req, res) => {
  try {
    const { username, nic, email, mobileNumber, password, ...userData } = req.body;

    // Strong password check
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      });
    }

    // Check for existing records
    const existing = await JobSeeker.findOne({
      $or: [
        { username },
        { nic },
        { email },
        { mobileNumber }
      ]
    });

    if (existing) {
      let conflictField = 'Username';
      if (existing.nic === nic) conflictField = 'NIC';
      else if (existing.email === email) conflictField = 'Email';
      else if (existing.mobileNumber === mobileNumber) conflictField = 'Contact';

      return res.status(400).json({ message: `${conflictField} already exists` });
    }

    const newJobSeeker = new JobSeeker({
      username,
      nic,
      email,
      mobileNumber,
      password,
      ...userData
    });

    await newJobSeeker.save();
    res.status(201).json({ message: 'Job Seeker registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployer = async (req, res) => {
  const employerId = req.params.id;

  try {
    // Step 1: Find employer
    const employer = await Employer.findById(employerId).lean();
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // Step 2: Mark status and backup employer
    employer.status = "owner-delete";
    await EmployerBackup.create(employer);

    // Step 3: Find all jobs by this employer
    const jobs = await Job.find({ employerId: employerId }).lean();

    if (jobs.length > 0) {
      // Step 4: Mark status and backup each job
      const jobsToBackup = jobs.map(job => ({
        ...job,
        status: "owner-account-delete"
      }));

      await JobBackup.insertMany(jobsToBackup);

      // Step 5: Delete all jobs from original collection
      const jobIds = jobs.map(job => job._id);
      await Job.deleteMany({ _id: { $in: jobIds } });
    }

    // Step 6: Delete employer from original collection
    await Employer.findByIdAndDelete(employerId);

    return res.status(200).json({ message: "Employer and related job posts deleted and backed up successfully" });
  } catch (error) {
    console.error("Error deleting employer and related jobs:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteJobSeeker = async (req, res) => {
  const jobSeekerId = req.params.id;

  try {
    // Find the job seeker account
    const jobSeeker = await JobSeeker.findById(jobSeekerId).lean(); // Fixed: was incorrectly fetching from Job
    if (!jobSeeker) {
      return res.status(404).json({ message: "JobSeeker Account not found" });
    }

    // Backup the job seeker
    jobSeeker.status = "owner-delete";
    await JobSeekerBackup.create(jobSeeker);

    // Remove job seeker from all job applicants arrays
    await Job.updateMany(
      { "applicants.userId": jobSeekerId },
      { $pull: { applicants: { userId: jobSeekerId } } }
    );

    // Delete the job seeker account
    await JobSeeker.findByIdAndDelete(jobSeekerId);

    return res.status(200).json({ message: "Job Seeker Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting job seeker account by owner:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const sendOtpForPasswordReset = async (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === "") {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    let user = await Employer.findOne({ username });
    if (!user) {
      user = await JobSeeker.findOne({ username });
    }

    if (!user) {
      return res.status(404).json({ message: "No account found with this username" });
    }

    const { email, _id: userId, userType } = user;

    // ✅ Reuse OTP logic
    await sendOtp(email);

    res.status(200).json({
      message: "OTP sent to your email",
      email,
      userId,
      userType,
    });

  } catch (err) {
    console.error("Error in sendOtpForPasswordReset:", err);
    res.status(500).json({ message: "Error processing your request" });
  }
};


const verifyOtpForPasswordReset = async (req, res) => {
  return verifyOtp(req, res);
};

const resetPassword = async (req, res) => {
  const { userType, userId, newPassword } = req.body;

  if (!userType || !userId || !newPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (userType === "Employer") {
      const updatedEmployer = await Employer.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedEmployer) {
        return res.status(404).json({ message: "Employer not found" });
      }

    } else if (userType === "JobSeeker") {
      const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
        userId,
        { password: hashedPassword },
        { new: true }
      );

      if (!updatedJobSeeker) {
        return res.status(404).json({ message: "Job Seeker not found" });
      }

    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ message: "Server error during password reset" });
  }
};

const verifyEmployerPassword = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "User ID and password are required" });
  }

  try {
    // 1. Find the employer by ID
    const employer = await Employer.findById(userId);
    if (!employer) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // 2. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, employer.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 3. Return success
    res.status(200).json({ message: "Password verified successfully" });

  } catch (err) {
    console.error("Error verifying password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyJobSeekerPassword = async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "User ID and password are required" });
  }

  try {
    // 1. Find the employer by ID
    const jobSeeker = await JobSeeker.findById(userId);
    if (!jobSeeker) {
      return res.status(404).json({ message: "Employer not found" });
    }

    // 2. Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, jobSeeker.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // 3. Return success
    res.status(200).json({ message: "Password verified successfully" });

  } catch (err) {
    console.error("Error verifying password:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkEmployerUniqueness = async (req, res) => {
  try {
    const { email, mobileNumber, nic } = req.body;

    const existing = await JobSeeker.findOne({
      $or: [
        { email },
        { mobileNumber },
        { nic }
      ]
    });

    if (!existing) {
      return res.status(200).json({
        emailExists: false,
        mobileExists: false,
        nicExists: false
      });
    }

    res.status(200).json({
      emailExists: existing.email === email,
      mobileExists: existing.mobileNumber === mobileNumber,
      nicExists: existing.nic === nic
    });
  } catch (err) {
    console.error('Error checking uniqueness:', err);
    res.status(500).json({ message: 'Server error checking uniqueness' });
  }
};

const checkJobSeekerUniqueness = async (req, res) => {
  try {
    const { email, mobileNumber, nic } = req.body;

    const existing = await Employer.findOne({
      $or: [
        { email },
        { mobileNumber },
        { nic }
      ]
    });

    if (!existing) {
      return res.status(200).json({
        emailExists: false,
        mobileExists: false,
        nicExists: false
      });
    }

    res.status(200).json({
      emailExists: existing.email === email,
      mobileExists: existing.mobileNumber === mobileNumber,
      nicExists: existing.nic === nic
    });
  } catch (err) {
    console.error('Error checking uniqueness:', err);
    res.status(500).json({ message: 'Server error checking uniqueness' });
  }
};



module.exports = {
  registerEmployer,
  registerJobSeeker,
  deleteEmployer,
  deleteJobSeeker,
  sendOtpForPasswordReset,
  verifyOtpForPasswordReset,
  resetPassword,
  verifyEmployerPassword,
  verifyJobSeekerPassword,
  checkEmployerUniqueness,
  checkJobSeekerUniqueness,
};
