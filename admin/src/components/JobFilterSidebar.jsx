const JobFilterSidebar = ({ searchTerm, onSearchChange }) => {
  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">Filters</h2>
      <input
        type="text"
        placeholder="Search by title or location, now"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 mb-4 text-sm border rounded"
      />
      <p className="text-sm text-gray-500">More filters coming soon </p>
    </aside>
  );
};

export default JobFilterSidebar;
