import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "Romeah Perera",
    contact: "+9470987654",
    address: "University of Kelaniya, Kelaniya.",
    city: "Kiribathgoda",
    nic: "991030753V",
    gender: "Male",
    description:
      "Romesh is a skilled culinary professional responsible for creating and preparing dishes with precision and creativity in a kitchen. They manage kitchen operations, ensuring high-quality meals while overseeing food safety, presentation, and flavor.",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!profile.name.trim()) newErrors.name = "Name is required.";
    if (!/^\+94\d{9}$/.test(profile.contact)) newErrors.contact = "Enter valid Sri Lankan contact number.";
    if (!profile.address.trim()) newErrors.address = "Address is required.";
    if (!profile.city.trim()) newErrors.city = "Nearest city is required.";
    if (!/^\d{9}[VvXx]$/.test(profile.nic)) newErrors.nic = "NIC format is invalid.";
    if (!profile.gender.trim()) newErrors.gender = "Gender is required.";
    if (!profile.description.trim()) newErrors.description = "Description is required.";
    return newErrors;
  };

  const handleSave = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setEditMode(false);
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleBack = () => {
    if (editMode) {
      setEditMode(false);
      setErrors({});
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-green-200">
        <h2 className="text-xl text-center font-bold text-green-700 mb-6">
          Job Seeker Profile
        </h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src="https://via.placeholder.com/80"
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-4 border-green-300 mb-2"
          />
          <h3 className="text-lg font-semibold text-green-800">Romesh Perera</h3>
          <p className="text-gray-600 text-sm">romperera@gmail.com</p>
        </div>

        <div className="space-y-3 text-sm text-green-900">
          {editMode ? (
            <>
              {['name','contact','address','city','nic','gender','description'].map((field) => (
                <div key={field}>
                  <label className="font-semibold capitalize">{field}:</label>
                  {field !== "description" ? (
                    <input
                      className="w-full border rounded p-1 mt-1"
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                    />
                  ) : (
                    <textarea
                      className="w-full border rounded p-1 mt-1"
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                    />
                  )}
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Contact:</strong> {profile.contact}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Nearest City:</strong> {profile.city}</p>
              <p><strong>NIC:</strong> {profile.nic}</p>
              <p><strong>Gender:</strong> {profile.gender}</p>
              <div>
                <strong>Description:</strong>
                <div className="bg-green-100 text-green-800 p-2 mt-1 rounded-lg shadow-inner text-xs">
                  {profile.description}
                </div>
              </div>
            </>
          )}

          <div className="flex items-center mt-2">
            <strong className="mr-2">Rating:</strong>
            <div className="flex space-x-1">
              {Array(5).fill(0).map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 fill-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handleBack} className="bg-green-100 hover:bg-green-200 text-green-800 font-semibold py-1 px-4 rounded-lg shadow-sm">
            Back
          </button>

          {editMode ? (
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg shadow">
              Save
            </button>
          ) : (
            <button onClick={() => setEditMode(true)} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg shadow">
              Edit
            </button>
          )}

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-lg shadow">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
