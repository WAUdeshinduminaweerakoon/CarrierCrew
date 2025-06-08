import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import API_ROUTES from "../../configs/config";

export default function EmployerProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const employerId = location.state?.employerId || localStorage.getItem("userId");

  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!employerId) {
      alert("Please login first.");
      navigate("/");
      return;
    }

    fetch(`${API_ROUTES.EMPLOYER}/${employerId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setEmployer(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [employerId, navigate]);

  const handleBack = () => navigate("/employer/home");

  if (loading) return <p className="mt-8 text-center">Loading profile...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;
  if (!employer) return <p className="mt-8 text-center">No employer data found.</p>;

  const company = employer.company || {};

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-100">
      <Header />

      <div className="w-full max-w-screen-sm p-4">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <div className="text-xl font-semibold text-green-800 mb-4 text-center">
            Employer Profile
          </div>

          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-green-300 text-white flex items-center justify-center text-3xl">
              👤
            </div>
            <h2 className="mt-2 text-lg font-bold text-green-900">
              {employer.firstName} {employer.lastName}
            </h2>
          </div>

          <div className="border-t border-green-200 pt-4">
            <h3 className="text-sm font-semibold text-green-800 mb-1">General Details</h3>
            <p className="text-sm"><strong>NIC:</strong> {employer.nic || "N/A"}</p>
            <p className="text-sm"><strong>Nearest City:</strong> {employer.nearestCity || "N/A"}</p>
            <p className="text-sm"><strong>District:</strong> {employer.district || "N/A"}</p>
          </div>

          <div className="border-t border-green-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-green-800 mb-1">Contact Details</h3>
            <p className="text-sm"><strong>Email:</strong> {employer.email || "N/A"}</p>
            <p className="text-sm"><strong>Mobile:</strong> {employer.mobileNumber || "N/A"}</p>
            <p className="text-sm"><strong>Address:</strong><br />{employer.address || "N/A"}</p>
          </div>

          <div className="border-t border-green-200 pt-4 mt-4">
            <h3 className="text-sm font-semibold text-green-800 mb-1">Description</h3>
            <div className="bg-gray-100 border border-gray-300 rounded-md p-3 text-sm text-justify">
              {employer.description || "No description provided"}
            </div>
          </div>

          <div className="flex items-center mt-4 text-sm">
            <strong className="mr-2 text-green-900">Rating:</strong>
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => {
                const isFilled = i < (company.rating || 0);
                return (
                  <Star
                    key={i}
                    size={16}
                    fill={isFilled ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={isFilled ? 1 : 1.5}
                    className={isFilled ? "" : "text-gray-300"}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 border-t border-green-200 pt-4">
            <span className="text-sm text-green-900 font-medium">Show Company Profile</span>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              onClick={() => navigate("/employer/companyprofile")}
            >
              View
            </button>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-1 border border-green-600 text-green-700 rounded hover:bg-green-100"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-700"
              onClick={() => navigate(`/employer/edit-profile/${employer._id}`)}
            >
              Edit
            </button>
            <button
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => navigate("/employer/settings")}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


