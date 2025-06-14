import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from "lucide-react";
import API_ROUTES from "../../../configs/config";

const EmployerRegistration = () => {
  const navigate = useNavigate();

  // Steps: company -> employerDetails -> setCredentials
  const [step, setStep] = useState("company");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [locations, setLocations] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [nearestCityOptions, setNearestCityOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);

  const [companyForm, setCompanyForm] = useState({
    name: "",
    email: "",
    telephone: "",
    companyType: "",
    address: "",
    nearestCity: "",
    uploadedFileID:"",
  });

  const [companyErrors, setCompanyErrors] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    nic: "",
    address: "",
    district: "",
    nearestCity: "",
    // username, password, confirmPassword will be added only at setCredentials step
  });

  const [errors, setErrors] = useState({});

  // OTP modal related states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);// make unable coutiune untill opt send

  useEffect(() => {
    setCompanyErrors({});
    setErrors({});
  }, [step]);

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
      nearestCity: ''
    }));
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

    setCompanyErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    if (validateCompany()) {
      setStep("employerDetails");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileId(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(API_ROUTES.UPLOAD+"/file", formData);
      const uploadedFileId = response.data.fileId;
      setFileId(uploadedFileId);
    // udesh add
      setCompanyForm(prev => ({
      ...prev,
      uploadedFileID: uploadedFileId
      }));
    } catch (err) {
      console.error('Upload error', err);
      alert("Upload failed");
    }
  };

  const handleDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateEmployerDetails = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required.";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address.";
    if (!formData.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.nic.trim()) newErrors.nic = "NIC is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.district.trim()) newErrors.district = "District is required.";
    if (!formData.nearestCity.trim()) newErrors.nearestCity = "Nearest City is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    try {
        setLoadingOtp(true); // Start loading
        const res = await axios.post(`${API_ROUTES.OTP}/send-otp`, {
        email: formData.email,
      });
      setMessage(res.data.message);
      setShowOtpModal(true); // Show OTP modal
      toast.success("OTP sent to your email", { autoClose: 2000 });
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
      toast.error(message, { autoClose: 2000 });
    } finally {
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
        setStep("setCredentials");
        setShowOtpModal(false);
        toast.success("OTP verified! Continue to set password", {
          autoClose: 3000,
        });
      } else {
        toast.error("Invalid OTP", { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed", {
        autoClose: 2000,
      });
    }
  };

  // Validate credentials form
  const validateCredentials = () => {
    const newErrors = {};
    if (!formData.username?.trim()) newErrors.username = "Username is required.";
    if (!formData.password?.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle employer details submit (send OTP)
  const handleEmployerDetailsSubmit = async (e) => {
  e.preventDefault();
  if (!validateEmployerDetails()) return;

  try {
    const res = await axios.post(`${API_ROUTES.REGISTER}/check-unique/employer`, {
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
      toast.error("Some details already exist. Please fix them before continuing.", { autoClose: 3000 });
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


  // Handle final credentials submit (complete registration)
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (validateCredentials()) {
      try {
        // Compose payload including username and password now
        const payload = {
          ...formData,
          userType: "Employer",
          company: companyForm,
        };

        const res = await axios.post(`${API_ROUTES.REGISTER}/register/employer`, payload);
        alert(res.data.message);
        navigate("/");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(error.response?.data?.message || "Registration failed", {
          position: "top-center",
          autoClose: 3000
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen pt-10 pb-10 ">
      <ToastContainer />
      <div className="w-full max-w-md p-5 mx-auto ">
        {/* Company Step */}
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
              <label className="text-sm text-left text-green-600 mb-2 block">
                Upload Authorization Letter
              </label>
              <div className="flex items-center">
                 {/* File input container with reduced right padding */}
               <div className="flex items-center border border-green-600 rounded-md pl-3 pr-1 py-2 flex-1">
                <input type="file" accept="application/pdf" onChange={handleFileChange}
                  className="text-sm text-gray-700 w-full" id="authorizationLetter"
               />
             </div>

                {/* Upload button aligned next to the input */}
              <button onClick={handleUpload} type="button"
               className="ml-3 px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              >
              Upload
              </button>
            </div>

             {/* Uploaded file ID display */}
            {fileId && (
            <div className="mt-2 text-sm text-green-700">
            {/*<strong>Uploaded File ID:</strong> {fileId}*/}
            </div>
            )}


              <div className="flex justify-between mt-5">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-green-600 rounded-md"
                >
                  Save and Continue
                </button>
                <button
                  type="button"
                  className="py-2 text-sm text-white bg-gray-500 rounded-md px-7"
                  onClick={() => setStep("employerDetails")}
                >
                  Skip
                </button>
              </div>


            </form>
          </>
        )}

        {/* Employer Details Step - No username/password here */}
        {step === "employerDetails" && (
          <>
            <h2 className="mb-6 text-lg font-bold text-center text-green-600">
              Add Employer Details (Required)
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleEmployerDetailsSubmit}>
              {["firstName", "lastName", "email", "mobileNumber", "nic", "address", "district", "nearestCity"].map((field) => {
                if(field === "district") {
                  return (
                    <div key={field}>
                      <select
                        name="district"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                         className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.district ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"
                        }`}
                      >
                        <option value="">Select District</option>
                        {locations.map((loc) => (
                          <option key={loc._id} value={loc.name}>{loc.name}</option>
                        ))}
                      </select>
                      {errors.district && <span className="text-sm text-red-500">{errors.district}</span>}
                    </div>
                  );
                }
                if(field === "nearestCity") {
                  return (
                    <div key={field}>
                      <select
                        name="nearestCity"
                        value={formData.nearestCity}
                        onChange={handleDataChange}
                        className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                          errors.nearestCity ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"
                        }`}
                      >
                        <option value="">Select Nearest City</option>
                        {nearestCityOptions.map((area) => (
                          <option key={area._id} value={area.name}>{area.name}</option>
                        ))}
                      </select>
                      {errors.nearestCity && <span className="text-sm text-red-500">{errors.nearestCity}</span>}
                    </div>
                  );
                }
                return (
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
                );
              })}
              <button type="submit" className="py-2 text-white bg-green-600 rounded-md disabled:opacity-50" disabled={loadingOtp}>
                {loadingOtp ? "Sending OTP..." : "Continue"}
              </button>
            </form>
          </>
        )}

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
              <h3 className="mb-4 text-lg font-semibold text-center text-green-600">Enter OTP</h3>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Enter the OTP sent to your email"
              />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 text-white bg-green-600 rounded"
                  onClick={handleVerifyOtp}
                >
                  Verify
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-600 rounded"
                  onClick={() => setShowOtpModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Set Credentials Step */}
        {step === "setCredentials" && (
          <>
            <h2 className="mb-6 text-lg font-bold text-center text-green-600">
              Set Your Credentials
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleCredentialsSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username || ""}
                  onChange={handleDataChange}
                  className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                    errors.username ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"
                  }`}
                />
                {errors.username && <span className="text-sm text-red-500">{errors.username}</span>}
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleDataChange}
                  className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"
                  }`}
                />
                <div
                  className="absolute cursor-pointer top-2 right-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
                {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword || ""}
                  onChange={handleDataChange}
                  className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 ${
                    errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-green-400 focus:ring-green-500"
                  }`}
                />
                <div
                  className="absolute cursor-pointer top-2 right-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
                {errors.confirmPassword && (
                  <span className="text-sm text-red-500">{errors.confirmPassword}</span>
                )}
              </div>

              <button type="submit" className="py-2 text-white bg-green-600 rounded-md">
                Register
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerRegistration;
