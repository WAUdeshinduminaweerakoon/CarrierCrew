const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  price: { type: Number, required: true },
  numberOfAddsPerMonth: { type: Number, required: true },
  additionalCharacteristics: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('SubscriptionPlan', subscriptionSchema);
