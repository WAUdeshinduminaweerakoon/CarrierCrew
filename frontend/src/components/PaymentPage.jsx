import React from "react";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const PaymentForm = ({ plan }) => {
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const employerId = localStorage.getItem('employerId');
      const res = await fetch('/api/assign-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employerId, planId: plan._id }),
      });

      if (res.ok) {
        toast.success('Your subscription plan has activated sucessfully!');
        setTimeout(()=> {navigate('/employer/home');},1500);
      } else {
        toast.error('Failed to assign plan');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while subscribing');
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen mt-4 bg-white border border-gray-300 rounded-xl shadow-lg p-10 space-y-4">
      <ToastContainer position="top-center" autoClose={3000}/>
      <h2 className="text-center text-green-600 font-bold text-xl">Pay For Service</h2>

      <div className="text-center">
        <p className="text-sm text-gray-700 font-semibold mb-1">We Accept</p>
        <div className="flex justify-center gap-2">
          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6" />
          <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="MasterCard" className="h-6" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Name on Card</label>
        <input type="text" placeholder="Card Name" className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Card Number</label>
        <input type="text" placeholder="Card Number" className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
      </div>

      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">Expire Date</label>
          <div className="flex gap-2">
            <input type="text" placeholder="MM" className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="text" placeholder="YYYY" className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">CVV</label>
          <input type="text" placeholder="CVV" className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition"
      >
        PAY Now
      </button>
    </div>
  );
};

export default PaymentForm;
