const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');

// GET company details by employer ID
router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).lean();

    if (!employer || !employer.company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(employer.company);
  } catch (err) {
    console.error('Error fetching company:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE company details by employer ID
router.put('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const updateCompany = req.body;

    // Update only company fields
    employer.company = {
      ...employer.company.toObject(),  // flatten subdocument
      ...updateCompany,
    };

    await employer.save();

    res.json(employer.company);
  } catch (err) {
    console.error('Error updating company:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
