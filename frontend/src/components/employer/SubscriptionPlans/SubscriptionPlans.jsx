import React, { useEffect, useState } from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const iconMap = {
  free: "🚴",
  basic: "🏍️",
  premium: "🚗",
  pro: "✈️",
};

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subscription/subscription-plans");
        setPlans(response.data);
      } catch (error) {
        toast.error("Failed to load subscription plans");
      }
    };
    fetchPlans();
  }, []);

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
      {plans.map((plan) => (
        <div
          key={plan._id}
          className="bg-white rounded-lg shadow p-4 mb-4 border border-green-200"
        >
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
                RS.{plan.price}/{plan.additionalCharacteristics[0]?.match(/\d+\s\w+/)?.[0] || "Plan"}
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
              Choose plan →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
