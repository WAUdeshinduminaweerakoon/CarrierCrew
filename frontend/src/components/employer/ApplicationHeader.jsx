import React from 'react';
import DistrictAreaDropdownEmployer from './DistrictAreaDropdownEmployer';
import CategoryDropdownEmployer from './CategoryDropdownEmployer';

const ApplicationHeader = ({ 
  searchTerm, 
  onSearchChange,
  onDistrictChange,
  onAreaChange,
  selectedCategory,
  onCategoryChange, 
}) => {
  return (
    <div className="w-full max-w-screen-sm p-4 mt-6 mb-4 bg-white shadow rounded-2xl">
      {/* Search Input */}
      <div className="mb-4">
        <label className="hidden mb-2 text-sm font-semibold text-green-700 md:block">Search</label>
        <input
          type="text"
          placeholder="Search by name, job title, location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 text-sm text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Responsive Filter Row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
        {/* Location Filter */}
        <div className="flex-1">
          <label className="hidden mb-2 text-sm font-semibold text-green-700 md:block"> Location</label>
          <DistrictAreaDropdownEmployer
            onDistrictChange={onDistrictChange}
            onAreaChange={onAreaChange}
          />
        </div>

        {/* Category Filter */}
        <div className="flex-1">
          <label className="hidden mb-2 text-sm font-semibold text-green-700 md:block">Category</label>
          <CategoryDropdownEmployer
            selectedCategory={selectedCategory}
            onChange={onCategoryChange}
          />
        </div>
        <div className="mt-4 text-right">
        <button
            onClick={() => {
            onSearchChange('');
            onDistrictChange('');
            onAreaChange('');
            onCategoryChange('');
            }}
            className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
        >
            Reset Filters
        </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationHeader;
