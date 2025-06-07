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

const getAllCategoryImages = async (req, res) => {
  try {
    const categories = await Category.find({});

    const formattedCategories = categories
      .filter(cat => cat.image && cat.image.data && cat.image.contentType) // Only categories with image data
      .map(cat => ({
        _id: cat._id,
        name: cat.name,
        image: `data:${cat.image.contentType};base64,${cat.image.data.toString('base64')}`,
      }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories', error });
  }
};



module.exports = {
  getAllCategories,
  getAllCategoryImages,
};