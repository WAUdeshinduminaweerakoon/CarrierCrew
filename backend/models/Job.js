const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jobseeker",
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  location: { type: String, required: true },
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true },
  timeFrom: { type: String, required: true },
  timeTo: { type: String, required: true },
  duration: { type: Number, required: true },
  payment: { type: Number, required: true },
  description: { type: String },
  vacancies: { type: Number, required: true },
  employerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employer",
    required: true,
  },
  applicants: [applicantSchema],
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Job", jobSchema);


