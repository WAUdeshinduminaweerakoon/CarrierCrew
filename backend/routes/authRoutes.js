const express = require('express');
const router = express.Router();
const { registerEmployer, registerJobSeeker } = require('../controllers/authController');

router.post('/register/employer', registerEmployer);
router.post('/register/jobseeker', registerJobSeeker);

module.exports = router;
