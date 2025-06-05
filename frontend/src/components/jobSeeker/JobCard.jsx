import React, { useState } from 'react';
import { toast } from 'react-toastify';

const API_ROUTES = {
  JOBS: 'http://localhost:5000/api/jobs',
};

const JobCard = ({ job, jobseekerId}) => {
  const [expanded, setExpanded] = useState(false);

  const handleApply = async (e) => {
    e.stopPropagation(); 
    console.log("Applying for job:", job._id);
    console.log("Jobseeker ID:", jobseekerId);

    try {
      const response = await fetch(`${API_ROUTES.JOBS}/${job._id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: jobseekerId }),
      });

      const result = await response.json();
      console.log("Apply response:", result);

      if (response.ok) {
        toast.success("Application submitted successfully!");
      } else {
        toast.error(`Application failed: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Application error:", err);
      toast.error("Something went wrong while applying.");
    }
  };

  return (
    <div className="w-10/12 p-4 text-center transition bg-white rounded-md shadow hover:bg-green-50">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <img
          src={job.image}
          alt={job.category}
          className="object-cover w-16 h-16 rounded-md"
        />
        <div className="flex-1 text-left">
          <h3 className="text-lg font-semibold text-green-800">{job.jobTitle}</h3>
          <p className="text-sm text-gray-600">{job.location}</p>
          <p className="text-sm text-gray-600">{job.duration}</p>
          <p className="text-sm text-gray-600">
            {job.dateFrom ? job.dateFrom.slice(0, 10) : ''}
          </p>
          <p className="text-sm font-medium text-green-700">{job.payment}</p>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 space-y-2 text-sm text-left text-gray-700">
          <p><strong>Working Hours:</strong> {job.duration}</p>
          <p>
            <strong>Working Days:</strong>{" "}
            {job.dateFrom ? job.dateFrom.slice(0, 10) : ""} -{" "}
            {job.dateTo ? job.dateTo.slice(0, 10) : ""}
          </p>
          <p><strong>Salary:</strong> {job.payment}</p>
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
