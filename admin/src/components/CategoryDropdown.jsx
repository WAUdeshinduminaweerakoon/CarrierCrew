import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_ROUTES from '../configs/config';

const CategoryDropdown = ({ selectedCategory, onChange }) => {
  const [categories, setCategories] = useState([]);
  const apiURL = `${API_ROUTES.JOBS_CATEGORY}/all`;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(apiURL);
        setCategories(res.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={(e) => {
        console.log('Selected category name:', e.target.value);
        onChange(e.target.value);
      }}
      className="p-2 text-green-700 bg-white border border-green-900 rounded hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;
