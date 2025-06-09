import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import API_ROUTES from "../../../configs/config";

const JobSeekerRegistration = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [nearestCityOptions, setNearestCityOptions] = useState([]);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nic: "",
    address: "",
    district: "",
    nearestCity: "",
    gender: "",
    education: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loadingOtp, setLoadingOtp] = useState(false);// disable contiune untill otp send


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_ROUTES.LOCATIONS}/all`);
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  const handleDistrictChange = (e) => {
    const districtName = e.target.value;
    setSelectedDistrict(districtName);

    setFormData((prevData) => ({
      ...prevData,
      district: districtName,
      nearestCity: "",
    }));

    const district = locations.find((loc) => loc.name === districtName);
    setNearestCityOptions(district ? district.areas : []);
  };

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSendOtp = async () => {
    try {
        setLoadingOtp(true); // Start loading
        const res = await axios.post(`${API_ROUTES.OTP}/send-otp`, {
        email: formData.email,
      });
      setMessage(res.data.message);
      setShowOtpModal(true); // Show OTP modal
      toast.success("OTP sent to your email", { autoClose: 3000 });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
      toast.error(message, { autoClose: 3000 });
    }finally {
    setLoadingOtp(false); // Stop loading after try/catch
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${API_ROUTES.OTP}/verify-otp`, {
        email: formData.email,
        otp,
      });
      if (res.data.success) {
        setStep(2);
        setShowOtpModal(false);
        toast.success("OTP verified! Continue to set password", {
          autoClose: 3000,
        });
      } else {
        toast.error("Invalid OTP", { autoClose: 3000 });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed", {
        autoClose: 3000,
      });
    }
  };

  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    if (!formData.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";
    if (!formData.nearestCity.trim()) newErrors.nearestCity = "Nearest City is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.education) newErrors.education = "Educational qualification is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInitialSubmit = async (e) => {
  e.preventDefault();
  if (!validateStepOne()) return;

  try {
    const res = await axios.post(`${API_ROUTES.REGISTER}/check-unique/jobseeker`, {
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      nic: formData.nic
    });

    const { emailExists, mobileExists, nicExists } = res.data;
    const newErrors = {};

    if (emailExists) newErrors.email = "Email already exists";
    if (mobileExists) newErrors.mobileNumber = "Mobile number already exists";
    if (nicExists) newErrors.nic = "NIC already exists";

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      toast.error("Some details already exist. Please fix them before continuing.", { autoClose: 2000 });
      return;
    }

    if (!loadingOtp) {
      await handleSendOtp(); // send OTP if all values are unique
    }
  } catch (err) {
    console.error("Error checking uniqueness", err);
    toast.error("Failed to check uniqueness. Please try again.", { autoClose: 2000 });
  }
};


  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (validateStepTwo()) {
      try {
        const payload = { ...formData, userType: "JobSeeker" };
        await axios.post(`${API_ROUTES.REGISTER}/register/jobseeker`, payload);
        toast.success("Registration successful!", { autoClose: 3000 });
        setTimeout(() => navigate("/"), 3000);
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(error.response?.data?.message || "Registration failed", {
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 ">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white border rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center text-green-600">
          Register as Job Seeker
        </h1>

        {step === 1 && (
          <form onSubmit={handleInitialSubmit} className="flex flex-col gap-4">
            {["firstName", "lastName", "email", "mobileNumber", "nic", "address"].map((field) => (
              <div key={field}>
                <input
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={formData[field]}
                  onChange={handleDataChange}
                  className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${errors[field] ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
                />
                {errors[field] && <span className="text-sm text-red-500">{errors[field]}</span>}
              </div>
            ))}

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
              {errors.district && <span className="text-sm text-red-500">{errors.district}</span>}
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

            <div>
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
              {errors.gender && <span className="text-sm text-red-500">{errors.gender}</span>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Educational Qualification</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleDataChange}
                className="block w-full p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select your qualification</option>
                <option value="Grade 8 or above">Grade 8 or above</option>
                <option value="After O/Ls">After O/Ls</option>
                <option value="After A/Ls">After A/Ls</option>
                <option value="Diploma">Diploma</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
              {errors.education && <span className="text-sm text-red-500">{errors.education}</span>}
            </div>

            <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 disabled:opacity-50" disabled={loadingOtp}>
              {loadingOtp ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleDataChange}
                className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${errors.username ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
              />
              {errors.username && <span className="text-sm text-red-500">{errors.username}</span>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleDataChange}
                className={`p-2 border rounded-md w-full pr-10 focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 flex items-center right-2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleDataChange}
                className={`p-2 border rounded-md w-full pr-10 focus:outline-none focus:ring-2 ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 flex items-center right-2 text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Register
            </button>
          </form>
        )}

        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
              <h2 className="text-lg font-semibold mb-4 text-center text-green-600">Enter OTP</h2>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border border-green-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter the OTP sent to your email"
              />
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleVerifyOtp}
                  className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="w-full py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobSeekerRegistration;
