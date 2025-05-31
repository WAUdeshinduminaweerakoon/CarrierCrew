import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from "lucide-react"; 

const Registration = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("selection");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [nearestCityOptions, setNearestCityOptions] = useState([]);

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
    gender: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setCompanyErrors({});
    setErrors({});
  }, [step]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/locations/all');
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  const handleSelection = (type) => {
    setUserType(type);
    setStep(type === "Employer" ? "company" : "jobseeker");
  };

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);
    setFormData({ ...formData, nearestCity: '' });
    const district = locations.find(loc => loc.name === districtName);
    setNearestCityOptions(district ? district.areas : []);
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
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    if (!formData.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.nearestCity.trim()) newErrors.nearestCity = "Nearest City is required.";
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (userType === "JobSeeker" && !formData.gender) newErrors.gender = "Gender is required."; 
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
          ...(userType === "Employer" && { company: companyForm }),
        };

        const endpoint =
          userType === "Employer"
            ? "http://localhost:5000/api/auth2/register/employer"
            : "http://localhost:5000/api/auth2/register/jobseeker";

        const res = await axios.post(endpoint, payload);
        alert(res.data.message);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data?.message || "Registration failed", {
         position: "top-center",
         autoClose: 3000
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-10 pb-10 bg-green-50">
       <ToastContainer />
      <div className="w-full max-w-md p-5 mx-auto font-sans bg-white border rounded-lg shadow-md">
        {step === "selection" && (
          <>
            <h1 className="mb-6 text-2xl font-bold text-center text-green-600">
              Unlock Part-Time Jobs. Join Us
            </h1>
            <p className="mb-6 text-center text-gray-600">I am a:</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSelection("JobSeeker")}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Job Seeker
              </button>
              <button
                onClick={() => handleSelection("Employer")}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                Employer
              </button>
            </div>
          </>
        )}

        {step === "company" && (
          <>
            <h1 className="mb-5 text-lg font-bold text-center text-green-600">
              Add Company Details (Optional)
            </h1>
            <form className="flex flex-col gap-3" onSubmit={handleCompanySubmit}>
              {["name", "email", "telephone", "companyType", "address", "nearestCity"].map(
                (field) => (
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
                      <p className="mt-1 text-xs text-left text-red-500">
                        {companyErrors[field]}
                      </p>
                    )}
                  </div>
                )
              )}
              <label htmlFor="upload" className="text-sm text-left text-green-600 cursor-pointer">
                Upload Authorization Letter
                <input
                  type="file"
                  id="upload"
                  className="w-full p-2 mt-1 text-sm border border-green-500 rounded-md"
                />
              </label>
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  className="py-2 text-sm text-green-800 bg-green-200 rounded-md px-7"
                  onClick={() => setStep("selection")}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="py-2 text-sm text-white bg-green-500 rounded-md px-7"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-white bg-gray-600 rounded-md"
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
            <h2 className="mb-6 text-lg font-bold text-center text-green-600">
              {userType === "Employer"
                ? "Add Employer Details (Required)"
                : "Add Job Seeker Details (Required)"}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {["firstName", "lastName", "email", "mobileNumber", "nic", "address", "username"].map((field) => (
                <div key={field}>
                  <input
                    type={field.includes("password") ? "password" : "text"}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={formData[field]}
                    onChange={handleDataChange}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${errors[field] ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
                  />
                  {errors[field] && <span className="text-sm text-red-500">{errors[field]}</span>}
                </div>
              ))}
                          <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleDataChange}
                className={`p-2 border rounded-md w-full pr-10 focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-green-400 focus:ring-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 flex items-center text-gray-600 right-2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleDataChange}
                className={`p-2 border rounded-md w-full pr-10 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-green-400 focus:ring-green-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 flex items-center text-gray-600 right-2"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <span className="text-sm text-red-500">{errors.confirmPassword}</span>
              )}
            </div>

              <div>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  className="w-full p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select District</option>
                  {locations.map((loc) => (
                    <option key={loc._id} value={loc.name}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  name="nearestCity"
                  value={formData.nearestCity}
                  onChange={handleDataChange}
                  className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${errors.nearestCity ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
                >
                  <option value="">Select Nearest City</option>
                  {nearestCityOptions.map((area) => (
                    <option key={area._id} value={area.name}>{area.name}</option>
                  ))}
                </select>
                {errors.nearestCity && <span className="text-sm text-red-500">{errors.nearestCity}</span>}
              </div>

              {userType === "JobSeeker" && (
                <div className="flex justify-center">
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleDataChange}
                    className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${errors.gender ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <span className="text-sm text-red-500">{errors.gender}</span>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setStep(userType === "Employer" ? "company" : "selection")
                  }
                  className="px-8 py-2 text-green-700 bg-green-200 rounded-md hover:bg-green-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
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
