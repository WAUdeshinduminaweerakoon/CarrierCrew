import React, { useState } from "react";

const districts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo",
  "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara",
  "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", "Mannar",
  "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya",
  "Polonnaruwa", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const GeneralSettings = () => {
  const [showForm, setShowForm] = useState(false);
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");

  // Reset form fields
  const resetForm = () => {
    setDistrict("");
    setArea("");
  };

  // Handle Add (for now just alert)
    const handleAdd = async () => {
    if (!district || !area) {
        alert("Please fill in both district and area");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/locations/add-area", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ district, area }),
        });

        const data = await response.json();

        if (!response.ok) {
        alert(`Error: ${data.error}`);
        } else {
        alert("Area added successfully!");
        resetForm();
        }
    } catch (error) {
        alert("Something went wrong while adding the area");
        console.error(error);
    }
    };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">General Settings</h1>

      {!showForm ? (
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Settings Overview</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Manage Admin Accounts</li>
            <li>Roles & Permissions</li>
            <li>Application Preferences</li>
            <li>Notification Settings</li>
            <li>Other General Settings</li>
            <li>
              <button
                onClick={() => setShowForm(true)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Manage Locations
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow max-w-md">
          <h2 className="text-2xl font-semibold mb-6">Add New Location</h2>

          <label className="block mb-2 font-medium text-gray-700">
            District
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select a district</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-4 font-medium text-gray-700">
            Area
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Enter area/subarea"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>

          <div className="flex space-x-4">
            <button
              onClick={handleAdd}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;

