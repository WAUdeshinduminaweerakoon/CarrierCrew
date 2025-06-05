import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlanCard = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/subscription/subscription-plans");
        const matchedPlan = response.data.find(
          (p) => p.planName.toLowerCase() === planName.toLowerCase()
        );
        if (!matchedPlan) throw new Error();
        setPlan(matchedPlan);
      } catch (err) {
        toast.error("Plan not found.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    };
    fetchPlan();
  }, [planName, navigate]);

  if (!plan) return <div className="text-center mt-10">Loading...</div>;

  const getIcon = (name) => {
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

  return (
    <div className="w-[360px] mx-auto min-h-screen bg-green-50 border border-green-300 rounded-xl shadow p-10 text-center space-y-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="flex justify-center text-5xl">
        {getIcon(plan.planName)}
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-300 transform -translate-y-1/2 rotate-1"></div>
        <div className="relative inline-block bg-green-600 text-white text-sm font-bold px-4 py-1 rounded shadow-md z-10">
          {plan.planName.toUpperCase()}
        </div>
      </div>

      <div className="mt-2">
        <h3 className="text-green-800 font-bold text-lg">
          RS.{plan.price.toFixed(2)}
        </h3>
      </div>

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

      <button
        onClick={() => navigate("/plans/pay")}
        className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition w-full"
      >
        PAY Now
      </button>
    </div>
  );
};

export default PlanCard;

