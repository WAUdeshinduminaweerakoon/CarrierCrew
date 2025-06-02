const express = require('express');
const router = express.Router();
const JobSeeker = require('../models/Jobseeker');

// GET job seeker by ID
router.get('/:id', async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findById(req.params.id).lean();

    if (!jobSeeker) {
      return res.status(404).json({ message: 'Job seeker not found' });
    }

    // Optionally remove sensitive info
    if (jobSeeker.password) {
      delete jobSeeker.password;
    }

    res.json(jobSeeker);
  } catch (err) {
    console.error('Error fetching job seeker:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE job seeker by ID
router.put('/:id', async (req, res) => {
  try {
    const jobSeekerId = req.params.id;
    const updateData = req.body;

    const jobSeeker = await JobSeeker.findById(jobSeekerId);
    if (!jobSeeker) {
      return res.status(404).json({ message: 'Job seeker not found' });
    }

    // Update profile fields if provided
    if (updateData.profile) {
      jobSeeker.profile = {
        ...jobSeeker.profile.toObject(),
        ...updateData.profile,
      };
    }

    // Update other fields (skip 'profile' since we handled it above)
    Object.keys(updateData).forEach((key) => {
      if (key !== 'profile') {
        jobSeeker[key] = updateData[key];
      }
    });

    await jobSeeker.save();

    const result = jobSeeker.toObject();
    if (result.password) {
      delete result.password;
    }

    res.json(result);
  } catch (error) {
    console.error('Error updating job seeker:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
