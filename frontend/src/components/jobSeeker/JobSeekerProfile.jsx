import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star } from "lucide-react";

export default function JobSeekerProfileView() {
  const navigate = useNavigate();
  const location = useLocation();
  const jobSeekerId = location.state?.jobSeekerId || localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobSeekerId) {
      alert("Please login first.");
      navigate("/");
      return;
    }

    fetch(`http://localhost:5000/api/jobSeeker/${jobSeekerId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [jobSeekerId, navigate]);

  const handleBack = () => navigate("/jobseeker/home");
  // const handleEdit = () => navigate("/jobseeker/profile/edit", { state: { jobSeekerId } });

  if (loading) return <p className="mt-8 text-center">Loading profile...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;
  if (!profile) return <p className="mt-8 text-center">No profile data found.</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md pb-4 bg-white border border-green-200 shadow-xl rounded-2xl">
        <div className="py-2 text-lg font-semibold text-center text-white bg-green-400 rounded-t-2xl">
          Job Seeker Profile
        </div>
        <div className="p-4 mx-4 mt-4 border border-green-300 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-20 h-20 text-2xl font-bold text-white bg-green-300 rounded-full">
              👤
            </div>
            <h2 className="mt-2 text-xl font-semibold">{profile.firstName || "N/A"} {profile.lastName || ''}</h2>
            <p className="text-sm text-gray-500">{profile.email || "N/A"}</p>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Contact</strong>: {profile.mobileNumber || "N/A"}</p>
            <p><strong>Address</strong>: {profile.address || "N/A"}</p>
            <p><strong>Nearest City</strong>: {profile.nearestCity || "N/A"}</p>
            <p><strong>NIC</strong>: {profile.nic || "N/A"}</p>
            <p><strong>Gender</strong>: {profile.gender || "N/A"}</p>
            <p><strong>Education</strong>:{profile.education || ''} </p>

            <div className="flex items-center mt-2">
              <strong className="mr-2">Rating</strong>:
              <div className="flex space-x-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < (profile.rating || 0) ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={i < (profile.rating || 0) ? 1 : 1.5}
                    className={i < (profile.rating || 0) ? "" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-1 text-green-700 border border-green-600 rounded hover:bg-green-200"
                onClick={handleBack}
              >
                Back
              </button>
              <button
              className="px-4 py-1 text-white bg-green-500 rounded hover:bg-green-700"
              type="button"
              onClick={() => navigate(`/jobseeker/edit-profile/${jobSeekerId._id}`)}
            >
              Edit
            </button>
              <button
                className="px-4 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                onClick={() => alert("Delete function not implemented yet")}
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
