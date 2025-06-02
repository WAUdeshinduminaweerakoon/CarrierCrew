const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');

// Get employer by ID
router.get('/:id', async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id).lean();
    if (!employer) return res.status(404).json({ message: 'Employer not found' });

    // Optionally remove sensitive info (like password) before sending
    delete employer.password;

    res.json(employer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
