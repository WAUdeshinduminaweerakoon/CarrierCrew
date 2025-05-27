const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // or any other model

router.get('/test-db', async (req, res) => {
  try {
    const jobs = await Job.find().limit(1); // Try fetching any job
    res.status(200).json({ success: true, message: 'DB connected', data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'DB not connected', error: error.message });
  }
});

module.exports = router;
