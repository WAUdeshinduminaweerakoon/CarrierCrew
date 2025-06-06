import React from "react";
import DistrictAreaDropdown from "./DistrictAreaDropdown"; 

const JobFilterSidebar = ({ searchTerm, onSearchChange, onDistrictChange, onAreaChange }) => {
  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Filters</h2>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Search</h3>
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 text-sm border rounded"
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Location</h3>
        <DistrictAreaDropdown
          onDistrictChange={onDistrictChange}
          onAreaChange={onAreaChange}
        />
      </div>

      <p className="text-sm text-gray-500">More filters coming soon</p>
    </aside>
  );
};

export default JobFilterSidebar;
