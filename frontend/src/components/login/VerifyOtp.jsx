// src/pages/VerifyOTP.jsx
import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import API_ROUTES from "../../configs/config";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId || "";
  const email = location.state?.email || "";
  const userType = location.state?.userType || ""; // Expect email to be passed from previous screen

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.trim().length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_ROUTES.ACCOUNT+"/recover/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        navigate("/reset-password", { state: { userId, email, userType } });
      } else {
        setError(data.message || "Invalid or expired OTP");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">
          Verify OTP
        </h2>
        <p className="mb-4 text-sm text-center text-gray-500">
          Enter the 6-digit code sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none border-gray-300 text-center tracking-widest"
            placeholder="Enter OTP"
          />
          {error && <p className="mb-2 text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;

