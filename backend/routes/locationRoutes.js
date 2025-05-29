const express = require("express");
const router = express.Router();
const { addArea } = require("../controllers/locationController");

router.post("/add-area", addArea);

module.exports = router;

