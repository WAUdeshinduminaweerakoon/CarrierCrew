import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import API_ROUTES from "../../configs/config";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { userId, email, userType } = location.state || {};

  // Password validation
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    const errors = {};
    if (!newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (!isStrongPassword(newPassword)) {
      errors.newPassword =
        "Password must be at least 6 characters, including uppercase, lowercase, number, and special character.";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      console.log("Navigating to reset-password with:", { userId, email, userType });
      const res = await axios.post(API_ROUTES.ACCOUNT+"/recover/reset-password", {
        userId,
        userType,
        newPassword,
      });

      if (res.status === 200) {
        navigate("/");
      }
    } catch (err) {
      setServerError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full h-screen max-w-sm p-6 border border-black rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          New Password
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm text-green-500 font-medium">
              Enter new password
            </label>
            <input
              type="password"
              className={`w-full px-3 py-2 border rounded-md mt-1 focus:outline-none ${
                errors.newPassword ? "border-red-500" : "border-green-400"
              }`}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-sm text-green-500 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                className={`w-full px-3 py-2 border rounded-md mt-1 focus:outline-none ${
                  errors.confirmPassword ? "border-red-500" : "border-green-400"
                }`}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="absolute right-3 top-3 text-blue-400">🔒</span>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-checkbox text-green-500"
            />
            <label className="ml-2 text-green-400 text-sm">Remember Me</label>
          </div>

          {serverError && (
            <p className="text-red-600 text-sm mb-2 text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-medium py-2 rounded-md transition ${
              loading
                ? "bg-green-300 text-gray-500 cursor-not-allowed"
                : "bg-green-300 text-blue-900 hover:bg-green-400"
            }`}
          >
            {loading ? "Resetting..." : "Submit"}
          </button>

          <div className="text-center mt-4">
            <Link to="/" className="text-blue-500 text-sm underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;

