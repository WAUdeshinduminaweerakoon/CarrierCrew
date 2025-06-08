import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/"), 1500); // delay for toast visibility
    };
  

  return (
    <header className="bg-green-700 text-white w-full py-4 shadow-md">
        <ToastContainer/>
      {/* Container */}
      <div className="w-full max-w-screen-lg mx-auto px-4 flex items-center justify-between relative">
        {/* Left: Brand */}
        <h1 className="font-semibold text-lg">CareerCrew.LK</h1>

        {/* Right: Desktop Nav */}
        <nav className="hidden sm:flex gap-4 text-sm items-center">
          <Link to="/jobseeker/home" className="py-2 px-2 hover:bg-green-700 rounded">Home</Link>
          <Link to="/jobseeker/profile" className="py-2 px-2 hover:bg-green-700 rounded">Profile</Link>
          <Link to="/jobseeker/settings" className="py-2 px-2 hover:no-underline">Settings</Link>
          <button onClick={handleLogout} className="py-2 hover:no-underline">Logout</button>
        </nav>

        {/* Hamburger (mobile only) */}
        <button className="sm:hidden" onClick={toggleMenu}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="bg-green-800 text-white text-center px-4">
          <Link to="/joboseeker/home" className="block py-2 hover:bg-green-700">Home</Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
          <Link to="/jobseeker/settings" className="block py-2 hover:bg-green-700">Settings</Link>
          <button onClick={() => {setIsMenuOpen(false);handleLogout();}}
           className="py-3 border-b border-green-600 hover:bg-green-600">Logout</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
