const mongoose = require('mongoose');
const subscriptionPlan = require('./subscriptionPlan');
const Employer = require('./Employer');

const ActiveSubscriptionSchema = new mongoose.Schema({
  employerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Employer' },
  subscriptionPlan: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SubscriptionPlan' },
  activatedDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true },
  usage: { type: Number, required: true, default: 0 },
  status:{type:String, required:true, default:"active"}
});

module.exports = mongoose.model('ActiveSubscription', ActiveSubscriptionSchema);


