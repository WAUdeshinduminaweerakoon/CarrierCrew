const express = require('express');
const router = express.Router();
const JobSeeker = require('../models/Jobseeker');


//  GET total job seeker count
router.get('/count', async (req, res) => {
  try {
    const count = await JobSeeker.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error counting job seekers:', err.message);
    res.status(500).json({ message: 'Failed to get job seeker count' });
  }
});

// FIRST: Get education options (specific route)
router.get('/education-options', (req, res) => {
  try {
    const educationEnum = JobSeeker.schema.path('education').enumValues;
    res.json(educationEnum);
  } catch (err) {
    console.error('Error fetching education options:', err);
    res.status(500).json({ message: 'Failed to get education options' });
  }
});

// GET job seeker by ID (dynamic route)
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
