
const District = require('../models/Location.js');


const addArea = async (req, res) => {
  const { district, area } = req.body;

  if (!district || !area) {
    return res.status(400).json({ error: "Both district and area are required" });
  }

  try {
    let districtDoc = await District.findOne({ name: district });

    if (!districtDoc) {
      // If the district does not exist, create it with the area
      districtDoc = new District({ name: district, areas: [{ name: area }] });
    } else {
      // Check if the area already exists
      const exists = districtDoc.areas.some(a => a.name.toLowerCase() === area.toLowerCase());

      if (exists) {
        return res.status(409).json({ error: "Area already exists in this district" });
      }

      districtDoc.areas.push({ name: area });
    }

    await districtDoc.save();
    res.status(201).json({ message: "Area added successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllLocations = async (req, res) => {
  try {
    const locations = await District.find(); // use District, not Location
    res.status(200).json(locations);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ message: "Failed to fetch locations", error: err.message || err });
  }
};

module.exports = {
  addArea,
  getAllLocations, 
};
