const express = require('express');
const {createSubscriptionPlan, getAllSubscriptionPlans, updateSubscriptionPlan,assignSubscriptionPlan,getSubscriptionPlanByName } = require('../controllers/subscriptionController');
//const { assignSubscriptionPlan } = require('../controllers/subscriptionController');
const router = express.Router();

// POST: Add a new subscription plan (Admin)
router.post('/add-subscription-plans/', createSubscriptionPlan);

// GET: Get all subscription plans (Customer view)
router.get('/subscription-plans', getAllSubscriptionPlans);

// UPDATE : update details for a subscription plan 
router.put("/subscription-plan/:id", updateSubscriptionPlan);

router.post('/assign-plan', assignSubscriptionPlan);

// GET : Get Subscription plan by name
router.get('/subscription-plan/:planName', getSubscriptionPlanByName);



module.exports = router;