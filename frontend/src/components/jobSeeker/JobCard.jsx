import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API_ROUTES from '../../configs/config';

const JobCard = ({ job, jobseekerId, categoriesWithImages }) => {
  const [expanded, setExpanded] = useState(false);
  const apiURL = `${API_ROUTES.JOBS}/${job._id}/apply`;

  const handleApply = async (e) => {
    e.stopPropagation();
    try {
      const response = await fetch(apiURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: jobseekerId }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error(`Application failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      toast.error("Something went wrong while applying.");
    }
  };

    const matchedCategory = categoriesWithImages.find(
      (cat) =>
        cat.name?.toLowerCase().trim() === job.jobTitle?.toLowerCase().trim()
    );



  const imageToShow = matchedCategory?.image || "/default-image.jpg";

  return (
    <div className="w-full max-w-8/12 mx-auto p-4 transition bg-white rounded-lg shadow hover:bg-green-50">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <img
          src={imageToShow}
          alt={job.category}
          className="object-cover w-28 h-28 rounded-md"
        />

        <div className="flex-1 text-left">
          <h3 className="text-lg font-semibold text-green-800">{job.jobTitle}</h3>
          <p className="text-sm text-gray-600">{job.location}</p>
          <p className="text-sm text-gray-600">{job.duration} hrs</p>
          <p className="text-sm text-gray-600">{job.dateFrom?.slice(0, 10)}</p>
          <p className="text-sm font-medium text-green-700">Rs. {job.payment}</p>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 space-y-2 text-sm text-left text-gray-700">
          <p><strong>Working Hours:</strong> {job.duration}</p>
          <p><strong>Working Days:</strong> {job.dateFrom?.slice(0, 10)} - {job.dateTo?.slice(0, 10)}</p>
          <p><strong>Salary:</strong> Rs. {job.payment}</p>
          <p><strong>Description:</strong> {job.description}</p>

          <button
            className="w-full py-2 mt-3 text-white transition bg-green-700 rounded hover:bg-green-800 disabled:opacity-50"
            onClick={handleApply}
          >
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;


