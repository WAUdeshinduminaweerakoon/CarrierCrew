import React, { useState, useRef } from "react";
import axios from "axios";

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await axios.post("/api/verify-otp", { otp: enteredOtp });
      setMessage(response.data.message || "OTP Verified Successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP, try again.");
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post("/api/resend-otp");
      setMessage(response.data.message || "OTP resent successfully!");
    } catch (error) {
      setMessage("Failed to resend OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50 p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-4">OTP Verification</h2>
      <p className="text-sm text-green-600 mb-2 text-center">
        We have sent an OTP code to your mobile device
        <br /> To verify
      </p>

      <div className="flex gap-2 my-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-12 h-12 text-center text-lg border-2 border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white font-medium px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        Confirm
      </button>

      <p className="text-sm text-green-600 mt-4">
        Didn't receive the OTP?{" "}
        <button onClick={handleResend} className="font-bold text-green-700 underline hover:text-green-800">
          Resend it
        </button>
      </p>

      {message && (
        <div className="mt-4 text-sm text-center text-green-700 font-medium">
          {message}
        </div>
      )}
    </div>
  );
}
