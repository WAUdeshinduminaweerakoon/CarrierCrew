import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import API_ROUTES from "../../configs/config";
import JobSeekerHeader from "./JobSeekerHeader";

export default function JobSeekerProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobSeekerId = location.state?.jobSeekerId || localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [educationOptions, setEducationOptions] = useState([]);

  useEffect(() => {
    // Fetch profile data
    fetch(`${API_ROUTES.JOBSEEKERS}/${jobSeekerId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Fetch error:", err));

    // Fetch education options
    fetch(`${API_ROUTES.JOBSEEKERS}/education-options`)
      .then((res) => res.json())
      .then((data) => setEducationOptions(data))
      .catch((err) => console.error("Error fetching education options:", err));
  }, [jobSeekerId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!profile.firstName?.trim()) errors.firstName = "Name is required.";
    if (!/^(\+94\s?\d{9}|0\d{9})$/.test(profile.mobileNumber)) errors.mobileNumber = "Enter valid Sri Lankan contact number.";
    if (!profile.address?.trim()) errors.address = "Address is required.";
    if (!profile.nearestCity?.trim()) errors.nearestCity = "Nearest city is required.";
    if (!/^\d{9}[VvXx]$/.test(profile.nic)) errors.nic = "NIC format is invalid.";
    if (!profile.gender?.trim()) errors.gender = "Gender is required.";
    if (!profile.education?.trim()) errors.education = "Education is required.";
    return errors;
  };

  const handleSave = () => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      fetch(`${API_ROUTES.JOBSEEKERS}/${jobSeekerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Profile updated successfully!");
          setTimeout(()=> {navigate("/jobseeker/profile", { state: { jobSeekerId } });},1500);
        })
        .catch((err) => console.error("Error updating profile:", err));
    } else {
      setFormErrors(errors);
    }
  };

  if (!profile) return <p className="mt-8 text-center">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Full Width Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <JobSeekerHeader />
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Main content with padding to avoid header overlap */}
      <div className="flex items-center justify-center p-4 pt-24">
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-green-600">
            Edit Job Seeker Profile
          </h2>
          <div className="p-4 space-y-2 text-sm">
            {["firstName", "lastName", "mobileNumber", "address", "nearestCity", "nic", "district", "gender"].map((field) => (
              <div key={field}>
                <label className="font-semibold capitalize">{field}:</label>
                <input
                  className="w-full p-1 mt-1 border rounded"
                  name={field}
                  value={profile[field] || ""}
                  onChange={handleChange}
                />
                {formErrors[field] && <p className="mt-1 text-xs text-red-500">{formErrors[field]}</p>}
              </div>
            ))}

            <div>
              <label className="font-semibold capitalize">Education:</label>
              <select
                className="w-full p-1 mt-1 border rounded"
                name="education"
                value={profile.education || ""}
                onChange={handleChange}
              >
                <option value="">Select education</option>
                {educationOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formErrors.education && <p className="mt-1 text-xs text-red-500">{formErrors.education}</p>}
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                className="w-1/2 py-2 text-green-700 border border-green-600 rounded hover:bg-green-200"
                onClick={() => {
                  if (window.confirm("Discard changes?")) {
                    navigate("/jobseeker/profile", { state: { jobSeekerId } });
                  }
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="w-1/2 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
