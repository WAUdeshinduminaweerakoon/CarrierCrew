const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');


// GET employer by ID
router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).lean();

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Optionally remove sensitive info
    if (employer.password) {
      delete employer.password;
    }

    res.json(employer);
  } catch (err) {
    console.error('Error fetching employer:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE employer by ID
router.put('/:id', async (req, res) => {
  try {
    const employerId = req.params.id;
    const updateData = req.body;

    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Update company fields if provided
    if (updateData.company) {
      employer.company = {
        ...employer.company.toObject(),  // ensure we’re working with plain object
        ...updateData.company,
      };
    }

    // Update other fields (skip 'company' since we handled it above)
    Object.keys(updateData).forEach((key) => {
      if (key !== 'company') {
        employer[key] = updateData[key];
      }
    });

    await employer.save();

    const result = employer.toObject();
    if (result.password) {
      delete result.password;
    }

    res.json(result);
  } catch (error) {
    console.error('Error updating employer:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const employers = await Employer.find().select('-password').lean(); // Exclude passwords
    res.json(employers);
  } catch (error) {
    console.error('Error fetching all employers:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;
