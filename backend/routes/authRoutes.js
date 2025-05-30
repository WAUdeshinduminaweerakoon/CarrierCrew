const express = require('express');
const router = express.Router();

const { registerEmployer, registerJobSeeker,loginUser } = require('../controllers/authController');

router.post('/register/employer', registerEmployer);
router.post('/register/jobseeker', registerJobSeeker);
router.post('/login', loginUser);

module.exports = router;


