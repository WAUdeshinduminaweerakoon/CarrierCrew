const express = require('express');
const router = express.Router();
const { getTotalEmployerCount, getTotalJobseekerCount, getTotalJobCount, getTotalApplicantCount, getJobsLastFourMonths, getUserRegistrationsLast4Months, addNewCategory, } = require('../controllers/adminController');
const { getAllCategories } = require('../controllers/categoryController');

// GET total number of employers
router.get('/employers/count', getTotalEmployerCount);
router.get('/jobseekers/count', getTotalJobseekerCount);
router.get('/jobs/count', getTotalJobCount);
router.get('/jobs/applicants/count', getTotalApplicantCount);

router.get('/jobs/last-four-months', getJobsLastFourMonths);
router.get('/users/last-four-months', getUserRegistrationsLast4Months);
router.post('/category/add', addNewCategory);
router.get('/category/view', getAllCategories);

module.exports = router;
