import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const DistrictAreaDropdown = ({ onAreaChange }) => {
  const [districts, setDistricts] = useState([]);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/locations/all");
        setDistricts(res.data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };

    fetchDistricts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAreaClick = (district, area) => {
    setSelectedDistrict(district.name);
    setSelectedArea(area.name);
    setIsOpen(false);
    console.log("Selected Area:", area.name);
    if (onAreaChange) onAreaChange(area.name);
  };

  const handleReset = () => {
    setSelectedDistrict(null);
    setSelectedArea(null);
    setIsOpen(false);
    if (onAreaChange) onAreaChange(""); // Pass empty string to reset filter
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="p-2 text-green-700 bg-white border border-green-900 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedArea ? `${selectedDistrict} - ${selectedArea}` : "All District"}
      </button>

      {isOpen && (
        <div className="absolute z-20 w-56 mt-2 bg-white border border-green-600 rounded-md shadow-lg">
          {/* All District option */}
          <div
            className="px-4 py-2 text-black cursor-pointer hover:bg-green-200 hover:text-green-800"
            onClick={handleReset}
          >
            All District
          </div>

          {/* Districts and their areas */}
          {districts.map((district) => (
            <div
              key={district._id}
              className="relative px-4 py-2 text-black cursor-pointer hover:bg-green-100 hover:text-green-800"
              onMouseEnter={() => setHoveredDistrict(district)}
              onMouseLeave={() => setHoveredDistrict(null)}
            >
              {district.name}
              {district.areas.length > 0 && (
                <span className="ml-2 text-green-600">&#9656;</span>
              )}

              {hoveredDistrict?._id === district._id && district.areas.length > 0 && (
                <div className="absolute top-0 z-30 w-56 ml-1 bg-white border border-green-400 rounded shadow-lg left-full">
                  {district.areas.map((area) => (
                    <div
                      key={area._id}
                      className="px-4 py-2 text-black cursor-pointer hover:bg-green-200 hover:text-green-800 whitespace-nowrap"
                      onClick={() => handleAreaClick(district, area)}
                    >
                      {area.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DistrictAreaDropdown;
