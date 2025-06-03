const SubscriptionPlan = require('../models/subscriptionPlan');
const Employer = require('../models/Employer');



// Create a new subscription plan (Admin)
const createSubscriptionPlan = async (req, res) => {
  try {
    const { planName, price, numberOfAddsPerMonth, additionalCharacteristics } = req.body;

    const newPlan = new SubscriptionPlan({
      planName,
      price,
      numberOfAddsPerMonth,
      additionalCharacteristics: additionalCharacteristics || [],
    });

    const savedPlan = await newPlan.save();
    res.status(201).json({ message: 'Subscription plan created successfully', plan: savedPlan });
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all subscription plans (Customer view)
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update subscription plan
const updateSubscriptionPlan = async (req, res) => {
  const { id } = req.params;
  const { planName, price, numberOfAddsPerMonth, additionalCharacteristics } = req.body;

  if (!planName || !price || !numberOfAddsPerMonth) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      id,
      {
        planName,
        price,
        numberOfAddsPerMonth,
        additionalCharacteristics: additionalCharacteristics || [],
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ error: "Subscription plan not found" });
    }

    res.status(200).json(updatedPlan);
  } catch (err) {
    console.error("Error updating subscription plan:", err);
    res.status(500).json({ error: "Server error" });
  }
};
const assignSubscriptionPlan = async (req, res) => {
  const { employerId, planId } = req.body;
  try {
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    const durationMap = {
      'Free': 7,
      'Basic': 30,
      'Premium': 90,
      'PRO': 180,
    };
    const days = durationMap[plan.planName] || 30;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + days);

    const updatedEmployer = await Employer.findByIdAndUpdate(
      employerId,
      {
        subscriptionPlan: {
          planId: plan._id,
          planStartDate: startDate,
          planEndDate: endDate,
          postsUsed: 0
        }
      },
      { new: true }
    );

    res.status(200).json({ message: 'Plan assigned successfully', employer: updatedEmployer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get subscription plan by name
const getSubscriptionPlanByName = async (req, res) => {
  try {
    const { planName } = req.params;
    const plan = await SubscriptionPlan.findOne({ planName: { $regex: new RegExp(`^${planName}$`, "i") } });
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};




module.exports = {
    createSubscriptionPlan,
    getAllSubscriptionPlans,
    updateSubscriptionPlan,
    assignSubscriptionPlan,
    getSubscriptionPlanByName,
};
