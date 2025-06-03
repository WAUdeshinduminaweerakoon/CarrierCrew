const Employer = require('../models/Employer');

const validatePlan = async (req, res, next) => {
  try {
    const employerId = req.user.id; // Ensure this is populated via auth middleware
    const employer = await Employer.findById(employerId).populate('subscriptionPlan.planId');

    if (!employer || !employer.subscriptionPlan || !employer.subscriptionPlan.planId) {
      return res.status(403).json({ error: 'No active subscription plan' });
    }

    const { planEndDate, postsUsed, planId } = employer.subscriptionPlan;

    const today = new Date();
    if (new Date(planEndDate) < today || postsUsed >= planId.numberOfAddsPerMonth) {
      return res.status(403).json({ error: 'Your plan is invalid. Please check your subscription.' });
    }

    req.employer = employer;
    next();
  } catch (error) {
    console.error('Plan validation error:', error);
    return res.status(500).json({ error: 'Server error during plan validation' });
  }
};

module.exports = validatePlan;
