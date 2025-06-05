import React from "react";
import { Bell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../Header";

const plans = [
  {
    title: "Free",
    price: "RS.0/7 Days",
    description: "Free access for a week\n5 job post sharing",
     icon: "🚴",
  },
  {
    title: "Basic",
    price: "RS.2500/1 Mon",
    description: "Valid for one month\n50 job post sharing",
    icon: "🏍️",
  },
  {
    title: "Premium",
    price: "RS.5000/3 Mon",
    description: "Valid for 3 month\n100 job post sharing",
    icon: "🚗",
  },
  {
    title: "PRO",
    price: "RS.10000/6 Mon",
    description: "Valid for 6 month\n200 job post sharing",
    icon: "✈️",
  },
];

const SubscriptionPlans = () => {
  return (
    <div>
      <Header/>
    <div className="max-w-sm mx-auto bg-green-100 p-4 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center bg-green-300 p-3 rounded-lg mb-4">
        <Link to="/employer/home">
          <ArrowLeft className="text-green-700 cursor-pointer" />
        </Link>
        <h2 className="text-green-900 font-bold text-lg">Choose Your Plan</h2>
        <Bell className="text-green-700 cursor-pointer" />
      </div>

      {/* Plans */}
      {plans.map((plan, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow p-4 mb-4 border border-green-200"
        >
          {/* Plan Title */}
          <div className="text-lg font-bold text-green-700 mb-2 ml-4">
            {plan.title}
          </div>

          {/* Icon + Price/Description */}
          <div className="flex items-center mb-4 ml-2">
            <span className="text-3xl">{plan.icon}</span>
            <div className="ml-16 text-center flex-2">
              <h3 className="text-green-800 font-semibold">{plan.price}</h3>
              <p className="text-sm whitespace-pre-line text-gray-700">
                {plan.description}
              </p>
            </div>
          </div>

          {/* Right-aligned Link */}
          <div className="text-right">
            <Link
              to={`/plan/${plan.title.toLowerCase()}`}
              className="text-green-600 text-md font-semibold hover:no-underline"
            >
              Choose plan →
            </Link>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SubscriptionPlans;
