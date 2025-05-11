import React, { useState } from "react";
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

const jobData = [
  {
    id: 1,
    title: "Delivery Rider",
    location: "Colombo",
    hours: "9am - 5pm",
    days: "Mon - Fri",
    salary: "Rs. 50,000",
    image: "/images/delivery.png",
  },
  {
    id: 2,
    title: "Cashier",
    location: "Kandy",
    hours: "8am - 4pm",
    days: "Tue - Sat",
    salary: "Rs. 40,000",
    image: "/images/cashier.png",
  },
  // Add more job objects as needed
];

const EmployerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <header className="bg-green-800 text-white w-full py-4 shadow-md">
        <div className="w-full max-w-screen-sm px-4 flex justify-between items-center text-sm">
          <button className="text-white" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="font-semibold truncate">CareerCrew.LK</h1>
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
              { label: "Profile", icon: <FaUser /> },
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
        {jobData.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-lg shadow-md p-4 flex gap-6 items-center"
          >
            <img
              src={job.image}
              alt={job.title}
              className="w-20 h-20 object-contain"
            />
            <div className="text-sm text-green-900">
              <h2 className="font-semibold text-base">{job.title}</h2>
              <p>{job.location}</p>
              <p>{job.hours}</p>
              <p>{job.days}</p>
              <p>{job.salary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployerHome;


