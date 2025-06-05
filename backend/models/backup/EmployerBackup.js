const mongoose = require("mongoose");

const employerBackupSchema = new mongoose.Schema({}, { strict: false }); 

module.exports = mongoose.model("EmployerBackup", employerBackupSchema);
