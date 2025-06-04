import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaPlus,
  FaClipboardList,
  FaUser,
  FaComments,
  FaRegStar,
  FaFileAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from "../../configs/config";

const EmployerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 1;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (userType === "Employer" && storedUserId) {
      setEmployerId(storedUserId);

      fetch(`${API_ROUTES.JOBS}/employer/${storedUserId}`)
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch((err) => console.error("Failed to fetch jobs:", err));
    } else {
      alert("Login first.");
      navigate("/");
    }
  }, [navigate]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
      <header className="w-full py-4 text-white bg-green-800 shadow-md">
        <div className="flex items-center justify-between w-full max-w-screen-sm px-4 text-sm">
          <button className="text-white" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="font-semibold truncate">CareerCrew.LK</h1>
        </div>
      </header>

      <div
        className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav>
          <a href="#" className="block py-2 hover:bg-green-700">
            Settings
          </a>
          <a href="#" className="block py-2 hover:bg-green-700">
            Logout
          </a>
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-screen-sm px-4 pt-4">
        <div className="p-4 bg-white shadow-md rounded-xl">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "My Posts",
                icon: <FaClipboardList />,
                onClick: () => navigate("/employer/my-posts"),
              },
              {
                label: "New Job",
                icon: <FaPlus />,
                onClick: () => navigate("/employer/create-job"),
              },
              {
                label: "Applications",
                icon: <FaFileAlt />,
                onClick: () => navigate("/employer/view-applications"),
              },
              {
                label: "Profile",
                icon: <FaUser />,
                onClick: () =>
                  navigate("/employer/profile", { state: { employerId } }),
              },
              { label: "Chat", icon: <FaComments /> },
              {
                label: "Subscriptions",
                icon: <FaRegStar />,
                onClick: () => navigate("/employer/subs-plans"),
              },
            ].map(({ label, icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex flex-col items-center py-6 text-sm font-semibold text-green-800 transition rounded-lg shadow bg-green-50 hover:bg-green-200"
              >
                <div className="text-2xl">{icon}</div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid w-full max-w-screen-sm gap-4 px-4 pt-6 pb-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No job advertisements available
          </p>
        ) : (
          currentJobs.map((job) => (
            <div
              key={job._id}
              className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={job.logoUrl || "/images/default-job.png"}
                alt={job.title}
                className="object-contain w-20 h-20"
              />
              <div className="text-sm text-green-900">
                <h2 className="text-base font-semibold">{job.jobTitle}</h2>
                <p>{job.location}</p>
                <p>{job.duration}</p>
                <p>{job.fromDate}</p>
                <p>{job.payment}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {jobs.length > jobsPerPage && (
        <div className="flex items-center justify-between w-full max-w-screen-sm px-4 pb-8 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300" : "bg-green-700 text-white"
            }`}
          >
            Previous
          </button>
          <span className="text-green-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-green-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployerHome;
