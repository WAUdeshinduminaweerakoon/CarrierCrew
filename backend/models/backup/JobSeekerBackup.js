const mongoose = require("mongoose");

const jobSeekerBackupSchema = new mongoose.Schema({}, { strict: false }); 

module.exports = mongoose.model("JobSeekerBackup", jobSeekerBackupSchema);
