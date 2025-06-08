const express = require('express');
const router = express.Router();
const { registerEmployer, registerJobSeeker,checkEmployerUniqueness,checkJobSeekerUniqueness } = require('../controllers/authController');

router.post('/register/employer', registerEmployer);
router.post('/register/jobSeeker', registerJobSeeker);
// 🔍 New route for uniqueness check
router.post('/check-unique/employer', checkEmployerUniqueness);
router.post('/check-unique/jobseeker', checkJobSeekerUniqueness);

module.exports = router;
