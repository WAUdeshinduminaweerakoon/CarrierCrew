import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header";
import "react-toastify/dist/ReactToastify.css";
import API_ROUTES from "../../../configs/config";

const PlanCard = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all plans
        const response = await axios.get(API_ROUTES.SUBSCRIPTIONS+"/subscription-plans");
        const matchedPlan = response.data.find(
          (p) => p.planName.toLowerCase() === planName.toLowerCase()
        );
        if (!matchedPlan) throw new Error("Plan not found");
        setPlan(matchedPlan);

        // Fetch user subscriptions
        const subRes = await axios.get(
          `${API_ROUTES.SUBSCRIPTIONS}/employer/${userId}`
        );

        // Find if user subscribed to this plan
        const current = subRes.data.subscriptions.find(
          (s) => s.subscriptionPlan._id === matchedPlan._id
        );
        if (current) setUserSubscription(current);
        else setUserSubscription(null); // explicitly clear if none found
      } catch (err) {
        toast.error("Error loading plan data.");
        setTimeout(() => navigate("/subscription-plans"), 1500);
      }
    };

    fetchData();
  }, [planName, navigate, userId]);

  const getIcon = (name) => {
    if (!name) return "📦";
    switch (name.toLowerCase()) {
      case "free":
        return "🚴";
      case "basic":
        return "🏍️";
      case "premium":
        return "🚗";
      case "pro":
        return "✈️";
      default:
        return "📦";
    }
  };
  
  const handleRenew = () => {
    navigate("/plans/pay", {
      state: {
        amount: plan.price,
        from: "renew",
        activeSubscriptionId: userSubscription._id,
      },
    });
  };



  const status = userSubscription?.status; // can be "active" or "expired" or undefined

  if (!plan) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading plan details...
      </div>
    );
  }

  return (
    <div>
      <Header/>
    <div className="w-[360px] mx-auto min-h-screen bg-green-50 border border-green-300 rounded-xl shadow p-10 text-center space-y-4">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Icon */}
      <div className="flex justify-center text-5xl">{getIcon(plan.planName)}</div>

      {/* Plan Name */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-300 transform -translate-y-1/2 rotate-1"></div>
        <div className="relative inline-block bg-green-600 text-white text-sm font-bold px-4 py-1 rounded shadow-md z-10">
          {plan.planName.toUpperCase()}
        </div>
      </div>

      {/* Price */}
      <div className="mt-2">
        <h3 className="text-green-800 font-bold text-lg">RS.{plan.price.toFixed(2)}</h3>
      </div>

      {/* Features */}
      <ul className="text-lg text-gray-700 space-y-1">
        {plan.additionalCharacteristics.map((feature, index) => (
          <li key={index} className="flex items-center justify-center gap-2">
            <span className="text-green-600">✔</span> <strong>{feature}</strong>
          </li>
        ))}
        <li className="flex items-center justify-center gap-2">
          <span className="text-green-600">✔</span>
          <strong>{plan.numberOfAddsPerMonth} Job Post Sharing</strong>
        </li>
      </ul>

      {/* Subscription Status */}
      {status && (
        <div
          className={`px-4 py-2 rounded font-semibold ${
            status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          Your current plan is <span className="uppercase">{status}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 mt-4">
        {/* If user has this plan */}
        {userSubscription ? (
          <>
            {/* Active plan: only "Change Plan" */}
            {status === "active" && (
              <button
                onClick={() => navigate("/subscription-plans")}
                className="w-full bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600 transition"
              >
                Change Plan
              </button>
            )}

            {/* Expired plan: show both Renew and Change */}
            {status === "expired" && (
              <>
                <button
                  onClick={handleRenew}
                  className="w-full bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                  Renew Plan
                </button>

                <button
                  onClick={() => navigate("/subscription-plans")}
                  className="w-full bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Change Plan
                </button>
              </>
            )}
          </>
        ) : (
          // If user does NOT have this plan - show Activate Now button
          <button
            onClick={() => navigate("/plans/pay")}
            className="w-full bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Activate Now
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default PlanCard;




