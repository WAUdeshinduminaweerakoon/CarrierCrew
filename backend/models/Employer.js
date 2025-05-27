const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  company: {
    name: String,
    email: String,
    telephone: String,
    companyType: String,
    address: String,
    nearestCity: String,
  },
  firstName: String,
  lastName: String,
  email: String,
  mobileNumber: String,
  nic: String,
  address: String,
  nearestCity: String,
  username: { type: String, unique: true },
  password: String,
  userType: { type: String, default: 'Employer' }
}, { timestamps: true });

module.exports = mongoose.model('Employer', employerSchema);
