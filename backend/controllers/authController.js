const Employer = require('../models/Employer');
const JobSeeker = require('../models/Jobseeker');

const registerEmployer = async (req, res) => {
  try {
    const { company, ...userData } = req.body;

    const existing = await Employer.findOne({ username: userData.username });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newEmployer = new Employer({
      company,
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
    const { username } = req.body;

    const existing = await JobSeeker.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newJobSeeker = new JobSeeker(req.body);
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
