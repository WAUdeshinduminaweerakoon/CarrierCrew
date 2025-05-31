import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'; // <-- if you use lucide-react icons (or replace with any other)

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!username.trim()) errors.username = "Username is required.";
    if (!password.trim()) errors.password = "Password is required.";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters.";
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.userType === "JobSeeker") {
            localStorage.setItem("userType", data.userType);
            localStorage.setItem("userId", data.userId);
            navigate("/jobseeker/home");
          } else if (data.userType === "Employer") {
            localStorage.setItem("userType", data.userType);
            localStorage.setItem("userId", data.userId);
            navigate("/employer/home");
          }
        } else {
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back, Glad to See You Again!
        </h2>

        <form onSubmit={handleLogin} className="mt-6">
          {errorMessage && (
            <p className="mb-4 text-sm text-center text-red-500">{errorMessage}</p>
          )}

          {/* Username input */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password input with show/hide */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 flex items-center text-gray-500 right-3"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
            <div className="mt-2 text-right">
              <Link to="/forgotpassword" className="text-sm text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
          >
            Login
          </button>

          {/* Register link */}
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Click here to Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
