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
  gender: String,
  userType: { type: String, enum: ['JobSeeker'], default: 'JobSeeker' },

  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  }

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


