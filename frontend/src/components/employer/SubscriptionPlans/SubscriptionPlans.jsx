import React, { useEffect, useState } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ROUTES from "../../../configs/config";

const iconMap = {
  free: "🚴",
  basic: "🏍️",
  premium: "🚗",
  pro: "✈️",
};

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPlansAndSubscription = async () => {
      try {
        // Fetch all plans
        const plansResponse = await axios.get(API_ROUTES.SUBSCRIPTIONS+"/subscription-plans");
        setPlans(plansResponse.data);

        // Fetch current subscription
        const subscriptionResponse = await axios.get(
          `${API_ROUTES.SUBSCRIPTIONS}/employer/${userId}`
        );

        if (subscriptionResponse.data.subscriptions.length > 0) {
          setUserSubscription(subscriptionResponse.data.subscriptions[0]);
        }
      } catch (error) {
        toast.error("Failed to load subscription information");
      }
    };

    fetchPlansAndSubscription();
  }, [userId]);

const getStatusBadge = (planId) => {
  if (
    userSubscription &&
    userSubscription.subscriptionPlan?._id === planId
  ) {
      const status = userSubscription.status;
      const badgeColor = status === "active" ? "bg-green-500" : "bg-red-500";
      return (
        <div
          className={`absolute top-2 right-2 px-2 py-1 text-xs text-white font-bold rounded ${badgeColor}`}
        >
          {status.toUpperCase()}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-sm mx-auto bg-green-100 p-4 rounded-xl shadow-lg">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center bg-green-300 p-3 rounded-lg mb-4">
        <Link to="/employer/home">
          <ArrowLeft className="text-green-700 cursor-pointer" />
        </Link>
        <h2 className="text-green-900 font-bold text-lg">Choose Your Plan</h2>
        <Bell className="text-green-700 cursor-pointer" />
      </div>

      {/* Plans */}
      {plans.map((plan) => {
        const isCurrentPlan = userSubscription?.subscriptionPlan?._id === plan._id;


        return (
          <div
            key={plan._id}
            className={`relative bg-white rounded-lg shadow p-4 mb-4 border ${
              isCurrentPlan
                ? userSubscription.status === "active"
                  ? "border-green-500 ring-2 ring-green-300"
                  : "border-red-400 ring-2 ring-red-300"
                : "border-green-200"
            }`}
          >
            {getStatusBadge(plan._id)}

            {/* Plan Title */}
            <div className="text-lg font-bold text-green-700 mb-2 ml-4">
              {plan.planName}
            </div>

            {/* Icon + Price/Description */}
            <div className="flex items-center mb-4 ml-2">
              <span className="text-3xl">
                {iconMap[plan.planName.toLowerCase()] || "📦"}
              </span>
              <div className="ml-16 text-center flex-2">
                <h3 className="text-green-800 font-semibold">
                  Rs.{plan.price} / per month
                </h3>
                <p className="text-sm whitespace-pre-line text-gray-700">
                  {plan.additionalCharacteristics.join("\n") +
                    `\n${plan.numberOfAddsPerMonth} job post sharing`}
                </p>
              </div>
            </div>

            {/* Right-aligned Link */}
            <div className="text-right">
              <Link
                to={`/plan/${plan.planName.toLowerCase()}`}
                className="text-green-600 text-md font-semibold hover:no-underline"
              >
                {isCurrentPlan && userSubscription.status === "active"
                  ? "Manage Plan →"
                  : userSubscription?.status === "expired" &&
                    isCurrentPlan
                  ? "Renew Plan →"
                  : "Choose plan →"}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;

