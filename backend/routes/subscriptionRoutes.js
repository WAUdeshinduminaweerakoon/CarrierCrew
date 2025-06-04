const express = require('express');
const {createSubscriptionPlan, getAllSubscriptionPlans, updateSubscriptionPlan,assignSubscriptionPlan,getSubscriptionPlanByName } = require('../controllers/subscriptionController');
const { activateSubscription, renewSubscription, getSubscriptionsByEmployerId, changeSubscriptionPlan } = require('../controllers/subscriptionController');


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

// activate new subscription
router.post('/activate', activateSubscription);

//renew subscription
router.post('/renew', renewSubscription);

//get subscription details for a particular user
router.get('/employer/:employerId', getSubscriptionsByEmployerId);

//change subscription
router.post('/change', changeSubscriptionPlan);









module.exports = router;