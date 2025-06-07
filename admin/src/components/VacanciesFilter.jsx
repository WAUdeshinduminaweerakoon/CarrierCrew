import React from "react";

const VacanciesFilter = ({ vacancies, onChange }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-600">Vacancies</h3>
      <input
        type="number"
        min="1"
        value={vacancies}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded"
        placeholder="Enter number of vacancies"
      />
    </div>
  );
};

export default VacanciesFilter;
