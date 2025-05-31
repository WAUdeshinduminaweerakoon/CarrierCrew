const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');

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

module.exports = {
  registerEmployer,
  registerJobSeeker
};
