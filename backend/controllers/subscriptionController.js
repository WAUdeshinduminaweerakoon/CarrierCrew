const SubscriptionPlan = require('../models/subscriptionPlan');
const Employer = require('../models/Employer');
const ActiveSubscription = require('../models/ActiveSubscription');


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

const activateSubscription = async (req, res) => {
  try {
    const { employerId, subscriptionPlanId } = req.body;

    // Validate input
    if (!employerId || !subscriptionPlanId) {
      return res.status(400).json({ message: 'Employer ID and Subscription Plan ID are required.' });
    }

    // Check if employer exists
    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found.' });
    }

    // Check if subscription plan exists
    const plan = await SubscriptionPlan.findById(subscriptionPlanId);
    if (!plan) {
      return res.status(404).json({ message: 'Subscription plan not found.' });
    }

    // Check for existing active subscription with same plan and employer
    const existingSubscription = await ActiveSubscription.findOne({
      employerId,
      subscriptionPlan: subscriptionPlanId,
      status: 'active'
    });

    if (
      existingSubscription &&
      existingSubscription.usage < plan.numberOfAddsPerMonth
    ) {
      return res.status(400).json({
        message: 'You already have an active subscription of this type with unused ad slots.'
      });
    }

    // Set activation and end date (e.g., 30 days validity)
    const activatedDate = new Date();
    const endDate = new Date();
    endDate.setDate(activatedDate.getDate() + 30);

    // Create new active subscription
    const activeSubscription = new ActiveSubscription({
      employerId,
      subscriptionPlan: subscriptionPlanId,
      activatedDate,
      endDate,
      usage: 0,
      status: 'active',
    });

    await activeSubscription.save();

    return res.status(201).json({
      message: 'Subscription activated successfully.',
      activeSubscription,
    });

  } catch (error) {
    console.error('Error activating subscription:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const renewSubscription = async (req, res) => {
  try {
    const { activeSubscriptionId } = req.body;

    // Validate input
    if (!activeSubscriptionId) {
      return res.status(400).json({ message: 'Active subscription ID is required.' });
    }

    // Fetch the active subscription
    const activeSubscription = await ActiveSubscription.findById(activeSubscriptionId);

    if (!activeSubscription) {
      return res.status(404).json({ message: 'Active subscription not found.' });
    }

    // Check if status is already "active"
    if (activeSubscription.status === 'active') {
      return res.status(400).json({
        message: 'Subscription is already active. No need to renew.',
      });
    }

    // Check if status is not "expired"
    if (activeSubscription.status !== 'expired') {
      return res.status(400).json({
        message: `Cannot renew a subscription unless it is expired. Current status: ${activeSubscription.status}`,
      });
    }

    // Renew the subscription
    const newActivatedDate = new Date();
    const newEndDate = new Date();
    newEndDate.setDate(newActivatedDate.getDate() + 30);

    activeSubscription.activatedDate = newActivatedDate;
    activeSubscription.endDate = newEndDate;
    activeSubscription.status = 'active';
    activeSubscription.usage = 0;

    await activeSubscription.save();

    return res.status(200).json({
      message: 'Subscription renewed successfully.',
      subscription: activeSubscription,
    });

  } catch (error) {
    console.error('Error renewing subscription:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const getSubscriptionsByEmployerId = async (req, res) => {
  try {
    const { employerId } = req.params;

    // Validate input
    if (!employerId) {
      return res.status(400).json({ message: 'Employer ID is required.' });
    }

    // Check if employer exists (optional but good practice)
    const employerExists = await Employer.findById(employerId);
    if (!employerExists) {
      return res.status(404).json({ message: 'Employer not found.' });
    }

    // Find all subscriptions for the employer and populate plan details
    const subscriptions = await ActiveSubscription.find({ employerId })
      .populate('subscriptionPlan') // populate full plan info
      .sort({ activatedDate: -1 }); // most recent first

    return res.status(200).json({
      message: 'Subscriptions fetched successfully.',
      subscriptions,
    });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

const changeSubscriptionPlan = async (req, res) => {
  try {
    const { employerId, subscriptionPlanId } = req.body;

    // Validate input
    if (!employerId || !subscriptionPlanId) {
      return res.status(400).json({ message: 'Employer ID and Subscription Plan ID are required.' });
    }

    // Verify employer exists
    const employer = await Employer.findById(employerId);
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found.' });
    }

    // Verify subscription plan exists
    const newPlan = await SubscriptionPlan.findById(subscriptionPlanId);
    if (!newPlan) {
      return res.status(404).json({ message: 'Subscription plan not found.' });
    }

    // Find the employer's current subscription (optional: restrict to only "active")
    const currentSubscription = await ActiveSubscription.findOne({ employerId });

    if (!currentSubscription) {
      return res.status(404).json({ message: 'No existing subscription found for this employer.' });
    }

    // Update subscription fields
    const activatedDate = new Date();
    const endDate = new Date();
    endDate.setDate(activatedDate.getDate() + 30);

    currentSubscription.subscriptionPlan = subscriptionPlanId;
    currentSubscription.activatedDate = activatedDate;
    currentSubscription.endDate = endDate;
    currentSubscription.usage = 0;
    currentSubscription.status = 'active';

    await currentSubscription.save();

    return res.status(200).json({
      message: 'Subscription plan changed successfully.',
      updatedSubscription: currentSubscription,
    });

  } catch (error) {
    console.error('Error changing subscription plan:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};









module.exports = {
    createSubscriptionPlan, //-- admin creates the allowed subscription plans
    getAllSubscriptionPlans, //-- to fetch all the details of the allowed subscription plans
    updateSubscriptionPlan, //-- admin updated the details of the allowed subscription plans
    assignSubscriptionPlan, 
    getSubscriptionPlanByName,
    activateSubscription, //-- employer activates a new subscription plan
    renewSubscription, //-- employer renews an existing subscription plan
    getSubscriptionsByEmployerId, //-- employer receives all the details of his/her subscrion plan
    changeSubscriptionPlan, //--employer changes his subscription plan
};
