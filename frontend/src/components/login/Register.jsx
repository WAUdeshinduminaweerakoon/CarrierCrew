import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("selection"); // selection | company | employer | jobseeker
  const [userType, setUserType] = useState("");

  const [companyForm, setCompanyForm] = useState({
    name: "",
    email: "",
    telephone: "",
    companyType: "",
    address: "",
    nearestCity: "",
  });

  const [companyErrors, setCompanyErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nic: "",
    address: "",
    nearestCity: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "", // Add gender field
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset errors whenever the step changes
    setCompanyErrors({});
    setErrors({});
  }, [step]);

  const handleSelection = (type) => {
    setUserType(type);
    if (type === "Employer") {
      setStep("company");
    } else {
      setStep("jobseeker");
    }
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm({ ...companyForm, [name]: value });
    setCompanyErrors({ ...companyErrors, [name]: "" });
  };

  const validateCompany = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!companyForm.name.trim()) newErrors.name = "Name is required.";
    if (!emailRegex.test(companyForm.email)) newErrors.email = "Invalid email address.";
    if (!phoneRegex.test(companyForm.telephone)) newErrors.telephone = "Must be 10 digits.";
    if (!companyForm.companyType.trim()) newErrors.companyType = "Company Type is required.";
    if (!companyForm.address.trim()) newErrors.address = "Address is required.";
    if (!companyForm.nearestCity.trim()) newErrors.nearestCity = "Nearest City is required.";

    setCompanyErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    if (validateCompany()) {
      setStep("employer");
    }
  };

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email address.";
    if (!formData.mobileNumber.match(/^\d{10}$/))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (userType === "JobSeeker" && !formData.gender) newErrors.gender = "Gender is required."; // Gender check for Job Seekers
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          ...formData,
          userType,
          ...(userType === 'Employer' && { company: companyForm })
        };

        const endpoint = userType === 'Employer' 
          ? 'http://localhost:5000/api/auth2/register/employer' 
          : 'http://localhost:5000/api/auth2/register/jobseeker';

        const res = await axios.post(endpoint, payload);
        alert(res.data.message);
        navigate("/"); // Redirect on success
      } catch (error) {
        alert(error.response?.data?.message || "Registration failed");
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 pt-10 pb-10">
      <div className="w-full max-w-md mx-auto p-5 bg-white border rounded-lg shadow-md font-sans">
        {step === "selection" && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-6 text-center">Unlock Part-Time Jobs. Join Us</h1>
            <p className="text-center mb-6 text-gray-600">I am a:</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSelection("JobSeeker")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Job Seeker
              </button>
              <button
                onClick={() => handleSelection("Employer")}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Employer
              </button>
            </div>
          </>
        )}

        {step === "company" && (
          <>
            <h1 className="text-lg font-bold text-green-600 mb-5 text-center">Add Company Details (Optional)</h1>
            <form className="flex flex-col gap-3" onSubmit={handleCompanySubmit}>
              {["name", "email", "telephone", "companyType", "address", "nearestCity"].map((field) => (
                <div key={field}>
                  <input
                    type="text"
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={companyForm[field]}
                    onChange={handleCompanyChange}
                    className={`p-2 text-sm border rounded-md w-full ${
                      companyErrors[field] ? "border-red-500" : "border-green-500"
                    }`}
                  />
                  {companyErrors[field] && (
                    <p className="text-xs text-red-500 text-left mt-1">{companyErrors[field]}</p>
                  )}
                </div>
              ))}
              <label htmlFor="upload" className="text-sm text-green-600 cursor-pointer text-left">
                Upload Authorization Letter
                <input
                  type="file"
                  id="upload"
                  className="p-2 text-sm border border-green-500 rounded-md mt-1 w-full"
                />
              </label>
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  className="px-7 py-2 text-sm bg-green-200 text-green-800 rounded-md"
                  onClick={() => setStep("selection")}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-2 text-sm bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md"
                  onClick={() => setStep("employer")}
                >
                  Proceed Without Company
                </button>
              </div>
            </form>
          </>
        )}

        {(step === "jobseeker" || step === "employer") && (
          <>
            <h2 className="text-lg font-bold text-green-600 mb-6 text-center">
              {userType === "Employer" ? "Add Employer Details (Required)" : "Add Job Seeker Details (Required)"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {["firstName", "lastName", "email", "mobileNumber", "nic", "address", "nearestCity", "username", "password", "confirmPassword"].map(
                (field) => (
                  <div key={field}>
                    <input
                      type={field.includes("password") ? "password" : "text"}
                      name={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={formData[field]}
                      onChange={handleDataChange}
                      className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                        errors[field]
                          ? "border-red-500 focus:ring-red-500"
                          : "border-green-400 focus:ring-green-500"
                      }`}
                    />
                    {errors[field] && (
                      <span className="text-red-500 text-sm">{errors[field]}</span>
                    )}
                  </div>
                )
              )}

              {userType === "JobSeeker" && (
                <div>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleDataChange}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                      errors.gender
                        ? "border-red-500 focus:ring-red-500"
                        : "border-green-400 focus:ring-green-500"
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(userType === "Employer" ? "company" : "selection")}
                  className="px-8 py-2 bg-green-200 text-green-700 rounded-md hover:bg-green-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Continue
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Registration;