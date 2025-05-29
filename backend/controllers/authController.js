const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Employer Registration
const registerEmployer = async (req, res) => {
  try {
    const { company, username, password, email } = req.body;

    const existing = await Employer.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployer = new Employer({
      company,
      username,
      email,
      password: hashedPassword,
    });

    await newEmployer.save();
    res.status(201).json({ message: 'Employer registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Job Seeker Registration
const registerJobSeeker = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existing = await JobSeeker.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newJobSeeker = new JobSeeker({
      username,
      email,
      password: hashedPassword,
    });

    await newJobSeeker.save();
    res.status(201).json({ message: 'Job Seeker registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Unified Login (for both Employer and JobSeeker)
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check in Employers
    let user = await Employer.findOne({ username });
    let userType = 'Employer';

    // If not found, check JobSeekers
    if (!user) {
      user = await JobSeeker.findOne({ username });
      userType = 'JobSeeker';
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.json({
      userId: user._id,
      username: user.username,
      userType,
      token: generateToken(user._id, userType),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerEmployer,
  registerJobSeeker,
  loginUser,
};
