import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import API_ROUTES from '../../configs/config';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from "./Header";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  const employerId = localStorage.getItem('userId');
  const apiURL = `${API_ROUTES.JOBS}/employer/${employerId}/applicants`;

 useEffect(() => {
  const fetchApplicants = async () => {
    try {
      const response = await axios.get(apiURL);
      const rawApplicants = response.data.applicants;

      const flatApplications = rawApplicants.flatMap(applicant =>
        applicant.appliedJobs.map(job => ({
          ...job,
          jobSeeker: applicant.jobSeeker,
        }))
      );

      // Sort by appliedAt or updatedAt in descending order
      flatApplications.sort((a, b) => new Date(b.appliedAt || b.updatedAt) - new Date(a.appliedAt || a.updatedAt));

      setApplications(flatApplications);
    } catch (err) {
      setError('Failed to fetch applicant data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchApplicants();
}, [apiURL]);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Pagination logic
  const totalPages = Math.ceil(applications.length / applicationsPerPage);
  const indexOfLast = currentPage * applicationsPerPage;
  const indexOfFirst = indexOfLast - applicationsPerPage;
  const currentApps = applications.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
     <Header/>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}
      >
        <nav>
          <Link to="/employer/home" className="block py-2 hover:bg-green-700">Home</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
          <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
          <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
        </nav>
      </div>

      {/* Page Title */}
      <div className="w-full max-w-screen-sm px-4 pt-4 text-lg font-semibold text-green-800">
        Job Applications
      </div>

      {/* Application List */}
      <div className="w-full max-w-screen-sm px-4 pt-4 pb-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading applications...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          <>
            {currentApps.map((app, index) => (
              <div
                key={index}
                className="p-4 mb-4 text-green-900 bg-white shadow-md rounded-2xl"
              >
                <h3 className="text-base font-semibold">
                  {app.jobSeeker.firstName} {app.jobSeeker.lastName}
                </h3>
                <p className="text-sm text-gray-700">
                  📧 {app.jobSeeker.email} | 📞 {app.jobSeeker.mobileNumber}
                </p>
                <p className="text-sm">NIC: {app.jobSeeker.nic}</p>
                <p className="mb-2 text-sm">City: {app.jobSeeker.nearestCity}</p>

                <div className="p-3 text-sm bg-gray-100 rounded-xl">
                  <p className="font-medium">🧑‍🎤 {app.jobTitle}</p>
                  <p>📍 {app.location}</p>
                  <p>
                    📅 {format(new Date(app.dateFrom), 'MMM dd')} to{' '}
                    {format(new Date(app.dateTo), 'MMM dd')}
                  </p>
                  <p>⏰ {app.timeFrom} - {app.timeTo}</p>
                  <p>💰 {app.payment} LKR</p>
                  <p className="text-xs text-gray-500">
                    Applied on: {format(new Date(app.appliedAt), 'PPpp')}
                  </p>
                </div>
              </div>
            ))}

            {/* Pagination Controls (only if more than one page) */}
            {applications.length > applicationsPerPage && (
              <div className="flex items-center justify-between max-w-screen-sm mx-auto mt-4 text-sm">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Previous
                </button>
                <span className="font-medium text-green-900">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;
