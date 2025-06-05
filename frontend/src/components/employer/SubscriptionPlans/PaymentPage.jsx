import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_ROUTES from "../../../configs/config";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [cardDetails, setCardDetails] = useState({
    name: "",
    number: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [disabled, setDisabled] = useState(false);
  const [otpOptions, setOtpOptions] = useState(null);
  const [selectedOtpMethod, setSelectedOtpMethod] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const {  name, number, expiryMonth, expiryYear, cvv } = cardDetails;
    if ( !name || !number || !expiryMonth || !expiryYear || !cvv) {
      toast.error("Please fill in all fields");
      return false;
    }
    if (!/^\d{16}$/.test(number)) {
      toast.error("Card number must be 16 digits");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      toast.error("CVV must be 3 digits");
      return false;
    }
    return true;
  };

  const handleSubscribe = async () => {
    if (!validateInputs()) return;

    const requestPayload = {
      name: cardDetails.name,
      cardNo: cardDetails.number, // Backend expects 'cardNo'
      expireMonth: cardDetails.expiryMonth,
      expireYear: cardDetails.expiryYear,
      cpv: cardDetails.cvv, // Backend expects 'cpv' not 'cvv'
    };

    console.log("Sending Request to /api/payment/validate-card:", requestPayload);

    try {
      const res = await fetch(API_ROUTES.PAYMENT+"/validate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestPayload),
      });

      const data = await res.json();
      console.log("Received Response:", data);

      if (res.ok) {
        setDisabled(true);
        setSessionId(data.sessionId);
        setOtpOptions(data.accountSummary);
        //toast.success(data.message || "Card is valid");
      } else {
        toast.error(data.message || "Card validation failed");
      }
    } catch (err) {
      console.error("Error during card validation:", err);
      toast.error("Error validating card");
    }
  };


  const handleSendOtp = async () => {
    if (!selectedOtpMethod) {
      toast.error("Please select an option to receive OTP");
      return;
    }

    try {
      const res = await fetch(API_ROUTES.PAYMENT+"/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          method: selectedOtpMethod === otpOptions.email ? "email" : "mobile",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "OTP sent");
        setOtpSent(true);
        // Optionally log or store the `otp` if in dev/test
        //console.log("OTP:", data.otp);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Network error while sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const res = await fetch(API_ROUTES.PAYMENT+"/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "OTP verified successfully");
        setOtpVerified(true);
        // Navigate or perform post-payment action here
        // navigate("/success");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Error verifying OTP");
    }
  };



  return (
    <div className="max-w-md mx-auto min-h-screen mt-4 bg-white border border-gray-300 rounded-xl shadow-lg p-10 space-y-4">
      <ToastContainer position="top-center" autoClose={3000} />
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
        <input
          type="text"
          name="name"
          placeholder="Card Name"
          value={cardDetails.name}
          onChange={handleChange}
          disabled={disabled}
          className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1 font-semibold">Card Number</label>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={cardDetails.number}
          onChange={handleChange}
          disabled={disabled}
          className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex gap-2">
        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">Expire Date</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="expiryMonth"
              placeholder="MM"
              value={cardDetails.expiryMonth}
              onChange={handleChange}
              disabled={disabled}
              className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="expiryYear"
              placeholder="YYYY"
              value={cardDetails.expiryYear}
              onChange={handleChange}
              disabled={disabled}
              className="w-1/2 border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="w-1/2">
          <label className="block text-sm text-gray-700 mb-1 font-semibold">CVV</label>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleChange}
            disabled={disabled}
            className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={disabled}
        className="w-full bg-green-500 text-white font-bold py-2 rounded-md hover:bg-green-600 transition disabled:opacity-60"
      >
        PAY Now
      </button>

      {/* OTP Options */}
      {otpOptions && (
        <div className="mt-6 p-4 border-t pt-4 border-gray-200 space-y-2">
          <h3 className="text-md font-semibold text-gray-700 text-center">Select OTP Option</h3>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="otpMethod"
                value={otpOptions.email}
                onChange={(e) => setSelectedOtpMethod(e.target.value)}
              />
              <span className="text-sm text-gray-700">{otpOptions.email}</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="otpMethod"
                value={otpOptions.mobile}
                onChange={(e) => setSelectedOtpMethod(e.target.value)}
              />
              <span className="text-sm text-gray-700">{otpOptions.mobile}</span>
            </label>
          </div>
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition"
          >
            Send OTP
          </button>
        </div>
      )}

      {otpSent && (
        <div className="space-y-2 mt-4">
          <label className="block text-sm text-gray-700 font-semibold">Enter OTP</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-blue-300 rounded-md p-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition"
          >
            Verify OTP
          </button>
        </div>
      )}

    </div>
  );
};

export default PaymentForm;

