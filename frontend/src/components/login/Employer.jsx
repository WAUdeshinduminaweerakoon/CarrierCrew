import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployerDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nic: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
//
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address";
    if (!formData.mobileNumber.match(/^\d{10}$/))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // If valid, navigate to the login page
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-10 pb-10">
      <div className="w-full max-w-md mx-auto p-5 bg-white border rounded-lg shadow-md font-sans">
        <h2 className="text-lg font-bold text-blue-500 mb-6 text-center">
          Add Hiring Employer Details (Required)
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.firstName ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.lastName ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Mobile Number"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.mobileNumber ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.mobileNumber && <span className="text-red-500 text-sm">{errors.mobileNumber}</span>}

          <input
            type="text"
            name="nic"
            value={formData.nic}
            onChange={handleChange}
            placeholder="NIC"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nic ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.nic && <span className="text-red-500 text-sm">{errors.nic}</span>}

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.address ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}

          <select
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            className="p-2 border border-blue-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Nearest City</option>
            <option value="City1">City 1</option>
            <option value="City2">City 2</option>
            <option value="City3">City 3</option>
          </select>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.username ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-blue-400 focus:ring-blue-500"
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
          )}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/company-details")}
              className="px-8 py-2 bg-blue-200 text-blue-600 font-medium rounded-md hover:bg-blue-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployerDetails;

