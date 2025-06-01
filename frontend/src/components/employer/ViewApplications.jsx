import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ViewApplications = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const employerId = localStorage.getItem('userId');
  const apiURL = `http://localhost:5000/api/jobs/employer/${employerId}/applicants`;

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(apiURL);
        setApplicants(response.data.applicants);
      } catch (err) {
        setError('Failed to fetch applicant data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) return <p className="p-4 text-center">Loading applications...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Job Applications</h2>
      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        applicants.map((applicant, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl p-4 mb-4">
            <h3 className="text-lg font-semibold">
              {applicant.jobSeeker.firstName} {applicant.jobSeeker.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              📧 {applicant.jobSeeker.email} | 📞 {applicant.jobSeeker.mobileNumber}
            </p>
            <p className="text-sm">NIC: {applicant.jobSeeker.nic}</p>
            <p className="text-sm">City: {applicant.jobSeeker.nearestCity}</p>

            <div className="mt-4 bg-gray-100 p-3 rounded-xl">
              {applicant.appliedJobs.map((job, i) => (
                <div key={i} className="mb-2 border-b pb-2 last:border-b-0 last:pb-0">
                  <p className="font-medium">🧑‍🎤 {job.jobTitle}</p>
                  <p className="text-sm">📍 {job.location}</p>
                  <p className="text-sm">
                    📅 {format(new Date(job.dateFrom), 'MMM dd')} to {format(new Date(job.dateTo), 'MMM dd')}
                  </p>
                  <p className="text-sm">⏰ {job.timeFrom} - {job.timeTo}</p>
                  <p className="text-sm">💰 {job.payment} LKR</p>
                  <p className="text-xs text-gray-500">
                    Applied on: {format(new Date(job.appliedAt), 'PPpp')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewApplications;
