import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ROUTES from "../../configs/config";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(API_ROUTES.OTP+"/send-otp", { email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify/verify-otp", { email, otp });
      if (res.data.success) {
        navigate("/login");
      } else {
        setMessage("Invalid OTP");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">OTP Verification</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        className="border p-2 w-full mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
        onClick={handleSendOtp}
        disabled={!email}
      >
        Send OTP
      </button>

      {otpSent && (
        <>
          <p className="text-green-600 mb-2">{message}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            className="border p-2 w-full mb-2"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </>
      )}

      {message && !otpSent && <p className="text-red-600 mt-2">{message}</p>}
    </div>
  );
};

export default OtpVerification;

