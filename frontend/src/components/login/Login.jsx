import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  //--Form validation

  const validateForm = () => {

    const errors = {};

    if (!username.trim()) errors.username = "Username is required.";
    if (!password.trim()) errors.password = "Password is required.";
    else if (password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    return errors;

  };



  //-- Handle form submission

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

        console.log(data.userType)

        if (response.ok) {

          // Navigate based on role
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


    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="w-full h-screen max-w-md bg-white rounded-lg shadow-md p-8">

        <h2 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back, Glad to See You Again!
        </h2>

        <form onSubmit={handleLogin} className="mt-6">

          {/* Error message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center mb-4">{errorMessage}</p>
          )}


          {/* Username input */}
          <div className="mb-4">

            <label className="block text-gray-600 font-medium mb-1">Username</label>

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
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}


          </div>

          {/* Password input */}
          <div className="mb-4">

            <label className="block text-gray-600 font-medium mb-1">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>


          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>



          {/* Register link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Click here to Register
            </a>
          </p>


        </form>


      </div>


    </div>
  );

};



export default Login;