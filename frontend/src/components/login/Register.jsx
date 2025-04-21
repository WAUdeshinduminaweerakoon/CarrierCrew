import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);
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
      navigate("/");  // Navigate to login or dashboard
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="p-8 bg-white rounded-2xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-700 mb-4">Unlock Part-Time Jobs. Join Us</h1>
          <p className="text-green-800 text-lg mb-6">I am a</p>
          <div className="flex justify-center gap-6">
            <button
              onClick={() => setUserType("Job Seeker")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Job Seeker
            </button>
            <button
              onClick={() => setUserType("Employer")}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Employer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 pt-10 pb-10">
      <div className="w-full max-w-md mx-auto p-5 bg-white border rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold text-green-700 mb-6 text-center">
          {userType === "Employer" ? "Add Hiring Employer Details" : "Register as Job Seeker"}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {["firstName", "lastName", "email", "mobileNumber", "nic", "address"].map((field) => (
            <div key={field}>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-green-400 focus:ring-green-500"
                }`}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

          <select
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            className="p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Nearest City</option>
            <option value="City1">City 1</option>
            <option value="City2">City 2</option>
            <option value="City3">City 3</option>
          </select>

          {["username", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <input
                type={field.includes("password") ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-500"
                    : "border-green-400 focus:ring-green-500"
                }`}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setUserType(null)}
              className="px-8 py-2 bg-green-200 text-green-700 font-medium rounded-md hover:bg-green-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


