const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  nic: String,
  address: String,
  nearestCity: String,
  username: { type: String, unique: true },
  password: String,
  gender: String,
  userType: { type: String, default: 'JobSeeker' }
}, { timestamps: true });

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
