import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaFilter } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DistrictAreaDropdownEmployer from './DistrictAreaDropdownEmployer';
import CategoryDropdownEmployer from './CategoryDropdownEmployer';

const ApplictionHeader = ({
  selectedCategory = "",
  onSearchChange,
  onDistrictChange,
  onCategoryChange,
  onAreaChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <>
      <ToastContainer />
      <header className="w-full text-white bg-green-800 shadow-md">
        {/* Top Navbar */}
        <div className="flex items-center justify-between max-w-screen-lg px-4 py-4 mx-auto">
          <h1 className="text-lg font-semibold sm:text-xl">CareerCrew.LK</h1>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FaBars className="text-2xl" />
          </button>

          {/* Desktop Menu */}
          <nav className="hidden space-x-6 text-base md:flex">
            <Link to="/jobseeker/home" className="py-2 hover:no-underline">All Jobs</Link>
            <Link to="/jobseeker/profile" className="py-2 hover:no-underline">Profile</Link>
            <Link to="/jobseeker/settings" className="py-2 hover:no-underline">Settings</Link>
            <button onClick={handleLogout} className="py-2 hover:no-underline">Logout</button>
          </nav>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
          <nav className="flex flex-col text-center bg-green-700">
            <Link to="/jobseeker/home" className="py-3 border-b border-green-600 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>All Jobs</Link>
            <Link to="/jobseeker/profile" className="py-3 border-b border-green-600 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            <Link to="/jobseeker/settings" className="py-3 border-b border-green-600 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>Settings</Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="py-3 hover:bg-green-600"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col max-w-screen-lg gap-4 px-4 py-4 mx-auto mb-6 bg-green-300 border-4 border-green-900 rounded-2xl md:flex-row md:items-center md:gap-6">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Search for jobs..."
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="flex-grow w-full p-2 text-black bg-white border border-green-800 md:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
            aria-label="Search for jobs"
          />

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 md:flex-1 md:gap-4">
            <DistrictAreaDropdownEmployer
              onDistrictChange={onDistrictChange}
              onAreaChange={onAreaChange}
            />
            <CategoryDropdownEmployer
             selectedCategory={selectedCategory}
             onChange={onCategoryChange}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default ApplictionHeader;
