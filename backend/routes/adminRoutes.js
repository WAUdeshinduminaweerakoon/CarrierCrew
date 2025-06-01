const express = require('express');
const router = express.Router();
const { getTotalEmployerCount, getTotalJobseekerCount, getTotalJobCount, getTotalApplicantCount } = require('../controllers/adminController');

// GET total number of employers
router.get('/employers/count', getTotalEmployerCount);
router.get('/jobseekers/count', getTotalJobseekerCount);
router.get('/jobs/count', getTotalJobCount);
router.get('/jobs/applicants/count', getTotalApplicantCount);

module.exports = router;
