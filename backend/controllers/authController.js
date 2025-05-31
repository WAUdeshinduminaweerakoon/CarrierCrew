const Employer = require('../models/Employer');
const JobSeeker = require('../models/JobSeeker');

const registerEmployer = async (req, res) => {
  try {
    const { company, username, nic, email, mobileNumber, password, ...userData } = req.body;

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
