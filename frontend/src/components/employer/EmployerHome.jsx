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


const EmployerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

    const [employerId, setEmployerId] = useState("");
  
    useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      const userType = localStorage.getItem("userType");

      if (userType === "Employer" && storedUserId) {
        setEmployerId(storedUserId);

        // Fetch jobs for this employer
        fetch(`http://localhost:5000/api/jobs/employer/${storedUserId}`)
          .then((res) => res.json())
          .then((data) => {
            setJobs(data);
          })
          .catch((err) => {
            console.error("Failed to fetch jobs:", err);
          });
      } else {
        alert("Login first.");
        navigate("/");
      }
    }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <header className="bg-green-800 text-white w-full py-4 shadow-md">
  <div className="w-full max-w-screen-sm px-4 flex justify-between items-center text-sm">
    {/* Hamburger (mobile only) */}
    <button className="text-white sm:hidden" onClick={toggleMenu}>
      <FaBars className="text-2xl" />
    </button>

    {/* Brand Name */}
    <h1 className="font-semibold truncate">CareerCrew.LK</h1>

    {/* Desktop Menu */}
    <nav className="hidden sm:flex gap-4 text-sm">
      <Link to="/employer/home" className="hover:underline">Home</Link>
      <Link to="/" className="hover:underline">Login</Link>
      <Link to="/employer/profile" className="hover:underline">Profile</Link>
      <a href="#" className="hover:underline">Settings</a>
      <a href="/" className="hover:underline">Logout</a>
    </nav>
  </div>

  {/* Mobile Dropdown Menu */}
  <div
    className={`sm:hidden transition-all duration-300 ease-in-out ${
      isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
    }`}
  >
    <nav className="bg-green-800 text-white text-center">
      <Link to="/employer/home" className="block py-2 hover:bg-green-700">
        Home
      </Link>
      <Link to="/" className="block py-2 hover:bg-green-700">
        Login
      </Link>
      <Link to="/employer/profile" className="block py-2 hover:bg-green-700">
        Profile
      </Link>
      <a href="#" className="block py-2 hover:bg-green-700">
        Settings
      </a>
      <a href="/" className="block py-2 hover:bg-green-700">
        Logout
      </a>
    </nav>
  </div>
</header>


      {/* Menu */}
      <div
        className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav>
          <Link to="/employer/home" className="block py-2 hover:bg-green-700">
            Home
          </Link>
          <Link to="/" className="block py-2 hover:bg-green-700">
            Login
          </Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">
            Profile
          </Link>
          <a href="#" className="block py-2 hover:bg-green-700">
            Settings
          </a>
          <a href="#" className="block py-2 hover:bg-green-700">
            Logout
          </a>
        </nav>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-screen-sm px-4 pt-4">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "My Posts", icon: <FaClipboardList /> },
              {
                label: "New Job",
                icon: <FaPlus />,
                onClick: () => navigate("/employer/create-job"),
              },
              { label: "Applications", icon: <FaFileAlt /> },
              { label: "Profile", icon: <FaUser />,
                onClick: () => navigate("/employer/profile"),
               },
              { label: "Chat", icon: <FaComments /> },
              { label: "Subscriptions", icon: <FaRegStar /> },
            ].map(({ label, icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="bg-green-50 text-green-800 font-semibold py-6 rounded-lg shadow hover:bg-green-200 transition text-sm flex flex-col items-center"
              >
                <div className="text-2xl">{icon}</div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards Section */}
      <div className="w-full max-w-screen-sm px-4 pt-6 pb-8 grid gap-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No job advertisements available</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-4 flex gap-6 items-center"
            >
              <img
                src={job.logoUrl || "/images/default-job.png"} // fallback image
                alt={job.title}
                className="w-20 h-20 object-contain"
              />
              <div className="text-sm text-green-900">
                <h2 className="font-semibold text-base">{job.jobTitle}</h2>
                <p>{job.location}</p>
                <p>{job.duration}</p>
                <p>{job.fromDate}</p>
                <p>{job.payment}</p>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default EmployerHome;


