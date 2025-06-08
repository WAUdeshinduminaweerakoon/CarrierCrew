const mongoose = require('mongoose');

const companyLetterSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('CompanyLetter', companyLetterSchema);
