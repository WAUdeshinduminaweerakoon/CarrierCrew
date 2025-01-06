import React, { useState } from 'react';
import './OTPVerification.css';

function App() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [message, setMessage] = useState('');

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 4) {
      setMessage('Please enter the complete OTP.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch('http://localhost:5000/resend-otp');
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      setMessage('Error resending OTP. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "blue", fontSize: "25px" }}>OTP Verification</h2>
      <p style={{ color: "#007FFF" }}>We have sent an OTP code to your mobile device.</p>
      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Confirm</button>
      <p className="resend" onClick={handleResend}>Didn't receive the OTP? <span>Resend it</span></p>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;