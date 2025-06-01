import React from "react";

const PremiumPlanCard = () => {
  return (
    <div className="w-[360px] mx-auto min-h-screen bg-green-50 border border-green-300 rounded-xl shadow p-10 text-center space-y-4">
      {/* Image */}
      <div className="flex justify-center">
        <img
          src="https://img.icons8.com/ios-filled/100/car--v1.png"
          alt="Car Icon"
          className="h-20"
        />
      </div>

      {/* Plan Title */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-300 transform -translate-y-1/2 rotate-1"></div>
        <div className="relative inline-block bg-green-600 text-white text-sm font-bold px-4 py-1 rounded shadow-md z-10">
          PREMIUM
        </div>
      </div>

      {/* Price & Duration */}
      <div className="mt-2">
        <h3 className="text-green-800 font-bold text-lg">RS.5000.00</h3>
        <p className="text-green-700 font-semibold">3 Months</p>
      </div>

      {/* Feature List */}
      <ul className="text-lg text-gray-700 space-y-1">
        <li className="flex items-center justify-center gap-2">
          <span className="text-green-600">✔</span>
          <strong>Valid for 3 months</strong>
        </li>
        <li className="flex items-center justify-center gap-2">
          <span className="text-green-600">✔</span>
          <strong>40 Job post sharing</strong>
        </li>
      </ul>

      {/* Pay Now Button */}
      <button className="bg-green-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 transition w-full">
        PAY Now
      </button>
    </div>
  );
};

export default PremiumPlanCard;
