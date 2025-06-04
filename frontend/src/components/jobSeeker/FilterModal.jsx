import React from 'react';

const FilterModal = ({
  isOpen,
  onClose,
  salaryRange,
  setSalaryRange,
  workingHours,
  setWorkingHours,
  applyFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-6 bg-white rounded shadow-lg w-96">
        <h2 className="mb-4 text-xl">Filter Jobs</h2>
        <div className="mb-4">
          <label htmlFor="salary" className="block mb-2 text-sm text-green-800">
            Salary Range
          </label>
          <input
            type="range"
            id="salary"
            min="0"
            max="100000"
            value={salaryRange[1]}
            onChange={(e) =>
              setSalaryRange([salaryRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-green-700">
            <span>Rs. {salaryRange[0]}</span>
            <span>Rs. {salaryRange[1]}</span>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="working-hours" className="block mb-2 text-sm text-green-800">
            Working Hours
          </label>
          <input
            type="range"
            id="working-hours"
            min="0"
            max="12"
            value={workingHours[1]}
            onChange={(e) =>
              setWorkingHours([workingHours[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-green-700">
            <span>{workingHours[0]} hrs</span>
            <span>{workingHours[1]} hrs</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700"
            onClick={() => {
              applyFilters();
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
