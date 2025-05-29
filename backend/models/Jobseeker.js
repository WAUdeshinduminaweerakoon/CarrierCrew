const mongoose = require('mongoose');

const jobSeekerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  nic: { type: String, required: true, unique: true },
  address: String,
  nearestCity: String,
  username: { type: String, required: true, unique: true },
  password: String,
  gender: String,
  userType: { type: String, default: 'JobSeeker' }
}, { timestamps: true });

module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
