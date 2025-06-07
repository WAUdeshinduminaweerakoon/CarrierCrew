import React from "react";

const CreatedDateFilter = ({ dateFrom, dateTo, onDateFromChange, onDateToChange }) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-sm font-semibold text-gray-600 hover:bg-green-100 hover:text-green-800">Posted Date</h3>
      <div className="flex gap-2">
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="w-1/2 px-2 py-1 text-gray-600 border border-black rounded"
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="w-1/2 px-2 py-1 text-gray-600 border border-black rounded"
        />
      </div>
    </div>
  );
};

export default CreatedDateFilter;
