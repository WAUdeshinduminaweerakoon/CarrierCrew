const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const jobSeekerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  nic: { type: String, required: true, unique: true },
  address: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  district: {type:String, required:true},
  nearestCity: {type:String, required:true},
  gender: String,
  education: {
  type: String,
  enum: [
    "Grade 8 or above",
    "After O/Ls",
    "After A/Ls",
    "Diploma",
    "Undergraduate",
    "Graduate",
  ],
  required: true,
},
  userType: { type: String, enum: ['JobSeeker'], default: 'JobSeeker' },
}, { timestamps: true });

jobSeekerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashed = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

//module.exports = mongoose.model('JobSeeker', jobSeekerSchema);
module.exports = mongoose.models.JobSeeker || mongoose.model('JobSeeker', jobSeekerSchema);


