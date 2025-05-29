const express = require("express");
const router = express.Router();
const { addArea, getAllLocations } = require("../controllers/locationController");

router.post("/add-area", addArea);

router.get("/all", getAllLocations);

module.exports = router;

