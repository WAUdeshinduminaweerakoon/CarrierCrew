// scheduler/subscriptionExpiryChecker.js
const cron = require('node-cron');
const ActiveSubscription = require('../models/ActiveSubscription');

// Run this every day at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const result = await ActiveSubscription.updateMany(
      { endDate: { $lt: now }, status: 'active' },
      { $set: { status: 'expired' } }
    );
    console.log(`Expired subscriptions updated: ${result.modifiedCount}`);
  } catch (err) {
    console.error('Error checking subscription expirations:', err);
  }
});
