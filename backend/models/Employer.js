const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const companySchema = new mongoose.Schema({
  name: String,
  email: String,
  telephone: String,
  companyType: String,
  address: String,
  nearestCity: String,
  description: String,
  rating: { type: Number, default: 0 },
  authorizedPerson: String,
});

const employerSchema = new mongoose.Schema({
  company: companySchema,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  nic: { type: String, required: true, unique: true },
  address: String,
  district : {type:String, required:true},
  nearestCity: {type:String, required:true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Employer'], default: 'Employer' },
  subscriptionPlan: {
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubscriptionPlan' },
  planStartDate: Date,
  planEndDate: Date,
  postsUsed: { type: Number, default: 0 },
}
}, { timestamps: true });

employerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const hashed = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashed;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Employer', employerSchema);
