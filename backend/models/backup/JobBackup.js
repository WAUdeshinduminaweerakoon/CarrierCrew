const mongoose = require("mongoose");

const jobBackupSchema = new mongoose.Schema({}, { strict: false }); 

module.exports = mongoose.model("JobBackup", jobBackupSchema);
