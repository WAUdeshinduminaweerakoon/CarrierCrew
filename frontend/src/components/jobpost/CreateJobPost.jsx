import React, { useState } from "react";

export default function NewJobForm() {
  const [vacancies, setVacancies] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    timeFrom: "",
    timeTo: "",
    duration: "",
    payment: ""
  });

  const [errors, setErrors] = useState({});

  const increaseVacancies = () => setVacancies(vacancies + 1);
  const decreaseVacancies = () => {
    if (vacancies > 1) setVacancies(vacancies - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.dateFrom) newErrors.dateFrom = "Start date is required";
    if (!formData.dateTo) newErrors.dateTo = "End date is required";
    if (!formData.timeFrom) newErrors.timeFrom = "Start time is required";
    if (!formData.timeTo) newErrors.timeTo = "End time is required";
    if (!formData.duration) newErrors.duration = "Duration is required";
    if (!formData.payment) newErrors.payment = "Payment is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted", { ...formData, vacancies });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 rounded-2xl shadow-lg bg-white border border-gray-200"
    >
      <div className="flex justify-center items-center gap-4 mb-4">
        <h2 className="text-xl font-bold text-blue-700">New Job</h2>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer border border-blue-400 rounded">
          <span className="text-blue-600 text-sm">Image +</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.jobTitle && <p className="text-red-500 text-xs">{errors.jobTitle}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Date From</label>
            <input
              type="date"
              name="dateFrom"
              value={formData.dateFrom}
              onChange={handleChange}
              className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dateFrom && <p className="text-red-500 text-xs">{errors.dateFrom}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Date To</label>
            <input
              type="date"
              name="dateTo"
              value={formData.dateTo}
              onChange={handleChange}
              className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dateTo && <p className="text-red-500 text-xs">{errors.dateTo}</p>}
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Time From</label>
            <input
              type="time"
              name="timeFrom"
              value={formData.timeFrom}
              onChange={handleChange}
              className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.timeFrom && <p className="text-red-500 text-xs">{errors.timeFrom}</p>}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Time To</label>
            <input
              type="time"
              name="timeTo"
              value={formData.timeTo}
              onChange={handleChange}
              className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.timeTo && <p className="text-red-500 text-xs">{errors.timeTo}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Time Duration (Hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.duration && <p className="text-red-500 text-xs">{errors.duration}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Payment Amount (Rs.)</label>
          <input
            type="number"
            name="payment"
            placeholder=" Rs.00000.00"
            value={formData.payment}
            onChange={handleChange}
            className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.payment && <p className="text-red-500 text-xs">{errors.payment}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">No of Vacancies</label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={decreaseVacancies}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <input
              type="number"
              value={vacancies}
              readOnly
              className="w-20 text-center input input-bordered border border-blue-400 rounded"
            />
            <button
              type="button"
              onClick={increaseVacancies}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">More Description</label>
          <textarea placeholder=" Other Information" className="w-full textarea border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" className="bg-blue-300 px-4 py-2 rounded font-bold hover:bg-gray-300">Back</button>
          <button type="reset" className="bg-blue-400 px-4 py-2 rounded font-bold hover:bg-gray-300">Reset</button>
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded font-bold hover:bg-gray-300">Publish</button>
        </div>
      </div>
    </form>
  );
}
