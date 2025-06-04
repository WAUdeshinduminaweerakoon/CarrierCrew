import React from 'react';

const LocationDropdown = ({ locations, selectedLocation, onChange }) => {
  return (
    <select
      value={selectedLocation}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 text-green-700 bg-white border border-green-900 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">All Locations</option>
      {locations.map((loc) => (
        <option
          key={loc}
          value={loc}
          className={selectedLocation === loc ? 'bg-green-100 font-semibold' : ''}
        >
          {selectedLocation === loc ? `✅ ${loc}` : loc}
        </option>
      ))}
    </select>
  );
};

export default LocationDropdown;
