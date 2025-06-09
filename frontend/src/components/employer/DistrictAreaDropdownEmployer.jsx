import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_ROUTES from '../../configs/config';


const DistrictAreaDropdownEmployer = ({ onAreaChange, onDistrictChange }) => {
  const [districts, setDistricts] = useState([]);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState("All District");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();
  const apiURL = `${API_ROUTES.LOCATIONS}/all`;

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await axios.get(apiURL);
        setDistricts(res.data);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDistrictClick = (district) => {
    //console.log("handleDistrictClick called with:", district);
    setSelectedLabel(district.name);
    setIsOpen(false);
    if (onDistrictChange) {
      console.log("Selected District:", district );
      onDistrictChange(district.name);
      onAreaChange();
    }
  };

  const handleAreaClick = (district, area) => {
    setSelectedLabel(`${district.name} - ${area.name}`);
    setIsOpen(false);
    if (onAreaChange) {
      console.log("Selected Area:", area.name);
      onAreaChange(area.name);
    }
  };

  const handleReset = () => {
    setSelectedLabel("All District");
    setIsOpen(false);
    if (onAreaChange) {
      onAreaChange();
      onDistrictChange();
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="p-2 text-green-700 bg-white border border-green-900 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {selectedLabel}
      </button>

      {isOpen && (
        <div className="absolute z-20 w-56 mt-2 bg-white border border-green-600 rounded-md shadow-lg">
          {/* Reset Option */}
          <div
            className="px-4 py-2 text-black cursor-pointer hover:bg-green-200 hover:text-green-800"
            onClick={handleReset}
          >
            All District
          </div>

          {/* Districts and Areas */}
          {districts.map((district) => (
            <div
              key={district._id}
              className="relative px-4 py-2 text-black cursor-pointer hover:bg-green-100 hover:text-green-800 group"
              onMouseEnter={() => setHoveredDistrict(district)}
              onMouseLeave={() => setHoveredDistrict(null)}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  //console.log("District clicked:", district);
                  handleDistrictClick(district);
                }}
              >
                {district.name}
              </div>

              {/* Areas submenu */}
              {hoveredDistrict?._id === district._id && district.areas.length > 0 && (
                <div className="absolute top-0 z-30 w-56 ml-1 bg-white border border-green-400 rounded shadow-lg left-full">
                  {district.areas.map((area) => (
                    <div
                      key={area._id}
                      className="px-4 py-2 text-black cursor-pointer hover:bg-green-200 hover:text-green-800 whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAreaClick(district, area);
                      }}
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

export default DistrictAreaDropdownEmployer;
