const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  areas: [areaSchema]
});

module.exports = mongoose.model('District', districtSchema);

