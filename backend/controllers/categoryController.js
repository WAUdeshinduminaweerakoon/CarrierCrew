const Category = require("../models/Category");

// GET /api/categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 }); 
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Server error fetching categories" });
  }
};

module.exports = {
  getAllCategories,
};