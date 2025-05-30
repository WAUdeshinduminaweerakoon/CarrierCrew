import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Strong password validation function
  const isStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return strongPasswordRegex.test(password);
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!newPassword.trim()) {
      errors.newPassword = "New password is required.";
    } else if (!isStrongPassword(newPassword)) {
      errors.newPassword =
        "Password must include uppercase, lowercase, number, special character and be at least 6 characters.";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Password reset successful!");
      navigate("/login"); // Redirect after success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-5 pb-5">
      <div className="w-full h-screen max-w-md p-10 border rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          New Password
        </h2>

        <form onSubmit={handleSubmit}>
          {/* New Password Field */}
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

          {/* Confirm Password Field */}
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
                placeholder="confirm password"
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

          {/* Remember Me */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="form-checkbox text-green-500"
            />
            <label className="ml-2 text-green-400 text-sm">Remember Me</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-300 text-blue-900 font-medium py-2 rounded-md hover:bg-green-400 transition"
          >
            Submit
          </button>

          {/* Back to Login */}
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
