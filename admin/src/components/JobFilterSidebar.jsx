import React, { useState } from "react";
import DistrictAreaDropdown from "./DistrictAreaDropdown";
import FilterModal from "./FilterModal"; // ✅ Make sure this path is correct





const JobFilterSidebar = ({
  searchTerm,
  onSearchChange,
  onDistrictChange,
  onAreaChange,
  salaryRange,
  setSalaryRange,
  workingHours,
  setWorkingHours,
  applyFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Filters</h2>

      {/* Search Filter */}
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

      {/* Location Filter */}
      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Location</h3>
        <DistrictAreaDropdown
          onDistrictChange={onDistrictChange}
          onAreaChange={onAreaChange}
        />
      </div>

      {/* Button to open Filter Modal */}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
        >
          More Filters
        </button>
      </div>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        applyFilters={applyFilters}
      />
    </aside>
  );
};

export default JobFilterSidebar;
