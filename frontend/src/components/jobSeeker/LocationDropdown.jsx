import React from 'react';

const LocationDropdown = ({ locations, selectedLocation, onChange }) => {
  return (
    <select value={selectedLocation} onChange={(e) => onChange(e.target.value)} className="p-2 border rounded">
      <option value="">All Locations</option>
      {locations.map((loc) => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  );
};

export default LocationDropdown;