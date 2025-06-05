import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";

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

    fetch(`http://localhost:5000/api/employers/${employerId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched employer data:", data);
        setEmployer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
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
    <div>
      <Header />
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md pb-4 bg-white border border-green-200 shadow-xl rounded-2xl">
        <div className="py-2 text-lg font-semibold text-center text-white bg-green-400 rounded-t-2xl">
          Employer Profile
        </div>
        <div className="p-4 mx-4 mt-4 border border-green-300 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white bg-green-300 rounded-full">
              <span>👤</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold">{employer.company?.name || 'N/A'}</h2>
            <p className="text-sm text-gray-500">{employer.company?.email || 'N/A'}</p>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Name</strong>: {employer.firstName} {employer.lastName}</p>
            <p><strong>Contact</strong>: {employer.mobileNumber || "N/A"}</p>
            <p><strong>Address</strong>: {employer.address || "N/A"}</p>
            <p><strong>Nearest City</strong>: {employer.nearestCity || "N/A"}</p>
            <div className="p-3 bg-gray-100 border border-gray-300 rounded-md">
              <p className="text-sm text-justify">
                <strong>Description</strong>: {company.description || "No description provided"}
              </p>
            </div>
            <div className="flex items-center mt-2">
              <strong className="mr-2">Rating</strong>:
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

            <p><strong>Authorized Person</strong>: {company.authorizedPerson || "N/A"}</p>

            <div className="flex items-center justify-between pt-4 mx-4 mt-4 border-t border-blue-200">
              <span className="text-gray-700 font-small"><strong>Show Company Profile</strong></span>
              <button
                className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700"
                onClick={() => navigate("/employer/companyprofile")}
              >
                View
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-1 text-green-700 border border-green-600 rounded hover:bg-green-200"
              type="button"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700"
              type="button"
              onClick={() => navigate(`/employer/edit-profile/${employer._id}`)}
            >
              Edit
            </button>
            <button
              className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-700"
              type="button"
              onClick={() => navigate(`/employer/settings`)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
