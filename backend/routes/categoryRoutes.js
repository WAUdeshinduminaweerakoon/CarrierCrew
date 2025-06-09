const express = require("express");
const router = express.Router();
const { getAllCategories, getAllCategoryImages } = require('../controllers/categoryController');

router.get("/all", getAllCategories);

router.get("/images", getAllCategoryImages);

module.exports = router;