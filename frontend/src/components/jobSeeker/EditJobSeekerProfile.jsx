import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function JobSeekerProfileEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobSeekerId = location.state?.jobSeekerId || localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobseeker/${jobSeekerId}`)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [jobSeekerId]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errors = {};
    if (!profile.name.trim()) errors.name = "Name is required.";
    if (!/^\+94\d{9}$/.test(profile.contact)) errors.contact = "Enter valid Sri Lankan contact number.";
    if (!profile.address.trim()) errors.address = "Address is required.";
    if (!profile.city.trim()) errors.city = "Nearest city is required.";
    if (!/^\d{9}[VvXx]$/.test(profile.nic)) errors.nic = "NIC format is invalid.";
    if (!profile.gender.trim()) errors.gender = "Gender is required.";
    if (!profile.description.trim()) errors.description = "Description is required.";
    return errors;
  };

  const handleSave = () => {
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      fetch(`http://localhost:5000/api/jobseeker/${jobSeekerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Profile updated successfully!");
          navigate("/jobseeker/profile", { state: { jobSeekerId } });
        })
        .catch((err) => console.error("Error updating profile:", err));
    } else {
      setFormErrors(errors);
    }
  };

  if (!profile) return <p className="mt-8 text-center">Loading profile...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white border border-green-200 shadow-xl rounded-2xl">
        <div className="py-2 text-lg font-semibold text-center text-white bg-green-400 rounded-t-2xl">
          Edit Job Seeker Profile
        </div>
        <div className="p-4 space-y-2 text-sm">
          {["name", "contact", "address", "city", "nic", "gender", "description"].map((field) => (
            <div key={field}>
              <label className="font-semibold capitalize">{field}:</label>
              {field !== "description" ? (
                <input
                  className="w-full p-1 mt-1 border rounded"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                />
              ) : (
                <textarea
                  className="w-full p-1 mt-1 border rounded"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                />
              )}
              {formErrors[field] && <p className="mt-1 text-xs text-red-500">{formErrors[field]}</p>}
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-1 text-green-700 border border-green-600 rounded hover:bg-green-200"
              onClick={() => navigate("/jobseeker/profile", { state: { jobSeekerId } })}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
