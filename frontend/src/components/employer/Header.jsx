import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-green-800 text-white w-full py-4 shadow-md">
      {/* Container */}
      <div className="w-full max-w-screen-lg mx-auto px-4 flex items-center justify-between relative">
        {/* Left: Brand */}
        <h1 className="font-semibold text-lg">CareerCrew.LK</h1>

        {/* Right: Desktop Nav */}
        <nav className="hidden sm:flex gap-4 text-sm items-center">
          <Link to="/employer/home" className="py-2 px-2 hover:bg-green-700 rounded">Home</Link>
          <Link to="/" className="py-2 px-2 hover:bg-green-700 rounded">Login</Link>
          <Link to="/employer/profile" className="py-2 px-2 hover:bg-green-700 rounded">Profile</Link>
          <Link to="/" className="py-2 px-2 hover:underline">Logout</Link>
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
          <Link to="/employer/home" className="block py-2 hover:bg-green-700">Home</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Logout</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
