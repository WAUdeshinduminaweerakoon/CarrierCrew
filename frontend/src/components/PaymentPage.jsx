import React from "react";

const PaymentForm = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen mt-4 bg-white border border-gray-300 rounded-xl shadow-lg p-10 space-y-4">
      {/* Header */}
      <h2 className="text-center text-green-600 font-bold text-xl">Pay For Service</h2>

      {/* We Accept */}
      <div className="text-center">
        <p className="text-sm text-gray-700 font-semibold mb-1">We Accept</p>
        <div className="flex justify-center gap-2">
          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
          <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="MasterCard" className="h-6" />
        </div>
      </div>

      {/* Name on Card */}
      <div>
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Name on Card</label>
        <input
          type="text"
          placeholder="Card Name"
          className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Card Number</label>
        <input
          type="text"
          placeholder="Card Number"
          className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Expire Date & CVV */}
      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">Expire Date</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM"
              className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="YYYY"
              className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">CVV</label>
          <input
            type="text"
            placeholder="CVV"
            className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Pay Now Button */}
      <button className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition">
        PAY Now
      </button>
    </div>
  );
};

export default PaymentForm;
