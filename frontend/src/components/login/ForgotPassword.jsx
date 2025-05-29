import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("/api/auth/send-otp", {
        phone: phoneNumber,
      });
      setMessage(response.data.message || "OTP sent successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to send OTP. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl border border-green-500">
        <h2 className="text-center text-xl font-bold text-green-700 mb-4">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-700 text-center mb-4">
          Please enter phone number associated with your account. We will send
          OTP to verify your account.
        </p>

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-3 py-2 border border-green-400 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        <button
          onClick={handleSendOTP}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
        >
          Send
        </button>

        {message && (
          <p className="mt-2 text-sm text-center text-green-700">{message}</p>
        )}

        <div className="text-center mt-4">
          <button className="text-green-600 text-sm hover:underline">
            Back to Login
          </button>
        </div>

        <div className="text-center mt-6 text-sm">
          <p className="mb-2">Didn't have an account?</p>
          <button className="w-full bg-green-300 text-gray-800 py-2 rounded-md hover:bg-green-400 transition">
            Sign UP
          </button>
        </div>
      </div>
    </div>
  );
}
