import React, { useState } from "react";
import DistrictAreaDropdown from "./DistrictAreaDropdown";
import FilterModal from "./FilterModal"; 
import CategoryDropdown from "./CategoryDropdown";
import VacanciesFilter from "./VacanciesFilter";
import CreatedDateFilter from "./CreatedDateFilter";


const JobFilterSidebar = ({
  searchTerm,
  onSearchChange,
  onDistrictChange,
  onAreaChange,
  selectedCategory,
  onCategoryChange,
  salaryRange,
  setSalaryRange,
  workingHours,
  setWorkingHours,
  vacancies,
  setVacancies,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  applyFilters,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Filters</h2>

      {/* Search Filter */}
      <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-green-700">Search</h3>
      <input
        type="text"
        placeholder="Search by title, location..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 text-sm text-green-600 border border-black rounded"
      />
    </div>


      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Location</h3>
        <DistrictAreaDropdown
          onDistrictChange={onDistrictChange}
          onAreaChange={onAreaChange}
        />
      </div>

      <div className="mb-4">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Category</h3>
        <CategoryDropdown
          selectedCategory={selectedCategory}
          onChange={onCategoryChange}
        />
      </div>
      <div className="mb-4">
        <VacanciesFilter
          vacancies={vacancies}
          onChange={setVacancies}
        />
      </div>
      <div className="mb-4">
          <CreatedDateFilter
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />
      </div>
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
