import React from "react";

const VacanciesFilter = ({ vacancies, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-600">Count of Vacancies</h3>
      <input
        type="number"
        min="1"
        value={vacancies}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm text-gray-700 border border-black rounded hover:border-green-700 hover:bg-green-100 hover:text-green-800"
        placeholder="Enter number of vacancies"
      />
    </div>
  );
};

export default VacanciesFilter;
