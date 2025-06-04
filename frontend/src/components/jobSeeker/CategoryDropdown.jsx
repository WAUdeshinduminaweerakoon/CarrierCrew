const CategoryDropdown = ({ categories, selectedCategory, onChange }) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 text-green-700 bg-white border border-green-900 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
