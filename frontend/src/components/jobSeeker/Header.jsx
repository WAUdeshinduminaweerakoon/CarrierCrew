import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaFilter } from 'react-icons/fa';
import DistrictAreaDropdown from './DistrictAreaDropdown';
import CategoryDropdown from './CategoryDropdown';

const Header = ({
  selectedCategory = "",
  categories = [],
  onLocationChange,
  onCategoryChange,
  toggleFilterModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full text-white bg-green-800 shadow-md">

      <div className="flex items-center justify-between max-w-screen-lg px-4 py-4 mx-auto">
        <h1 className="text-lg font-semibold sm:text-xl">CareerCrew.LK</h1>

      
        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars className="text-2xl" />
        </button>

    
        <nav className="hidden space-x-6 text-base md:flex">
          <Link to="/home" className="py-2 hover:underline">All Jobs</Link>
          <Link to="/" className="py-2 hover:underline">Login</Link>
          <Link to="/jobseeker/profile" className="py-2 hover:underline">Profile</Link>
        </nav>
      </div>

    
      <div className={`md:hidden overflow-hidden transition-max-height duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="flex flex-col text-center text-white bg-green-700">
          <Link to="/home" className="py-3 border-b border-green-600 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>All Jobs</Link>
          <Link to="/" className="py-3 border-b border-green-600 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>Login</Link>
          <Link to="/jobseeker/profile" className="py-3 hover:bg-green-600" onClick={() => setIsMenuOpen(false)}>Profile</Link>
        </nav>
      </div>

     
      <div className="flex flex-col max-w-screen-lg gap-4 px-4 py-4 mx-auto mb-6 bg-green-300 border-4 border-green-900 rounded-2xl md:flex-row md:items-center md:gap-6">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="flex-grow w-full p-2 text-black bg-white border border-green-800 md:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-green-700"
          aria-label="Search for jobs"
        />

        <div className="flex flex-wrap gap-2 md:flex-nowrap md:items-center md:flex-1">
          <DistrictAreaDropdown onAreaChange={onLocationChange} />

          {categories.length > 0 && (
            <CategoryDropdown
              selectedCategory={selectedCategory}
              onChange={onCategoryChange}
            />
          )}

          <button
            onClick={toggleFilterModal}
            className="p-2 text-green-800 transition-colors bg-white rounded-full shadow hover:bg-green-200"
            aria-label="Open filters"
          >
            <FaFilter className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
