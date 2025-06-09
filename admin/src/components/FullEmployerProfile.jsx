import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_ROUTES from '../configs/config';

const FullEmployerProfile = ({ onFileSelect }) => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = `${API_ROUTES.ADMIN_JOBS} /`;

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await axios.get(apiURL);
        console.log('Employers API response:', response.data);

        const rawEmployers = Array.isArray(response.data)
          ? response.data
          : response.data.employers || [];

        if (rawEmployers.length > 0) {
          setEmployers(rawEmployers);
        } else {
          setError('No employer data found.');
        }
      } catch (err) {
        setError('Failed to fetch employer data.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  if (loading) return <p className="text-gray-600">Loading employer profiles...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!employers.length) return <p className="text-gray-500">No employer data available.</p>;

  return (
    <div className="space-y-4">
      {employers.map((employer) => {
        const isExpanded = expandedIds.includes(employer._id);
        const company = employer.company || {};

        return (
          <div
            key={employer._id}
            className="p-5 transition-all duration-200 bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:shadow-md"
            onClick={() => toggleExpand(employer._id)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-green-700">
                {(employer.firstName || '') + ' ' + (employer.lastName || '')}
              </h3>
              <span className="text-sm text-gray-500">
                {isExpanded ? '▲' : '▼'}
              </span>
            </div>
            <div className="grid grid-cols-2 mt-1 text-sm text-gray-700 sm:grid-cols-2 gap-x-4 gap-y-1">
              <p><span className="font-medium">District:</span> {employer.district || 'N/A'}</p>
              <p><span className="font-medium">Nearest City:</span> {employer.nearestCity || 'N/A'}</p>
              <p><span className="font-medium">Email:</span> {employer.email || 'N/A'}</p>
              <p><span className="font-medium">Contact:</span> {employer.mobileNumber || 'N/A'}</p>
            </div>

            {isExpanded && (
              <div className="p-4 mt-4 space-y-2 text-sm border-t border-gray-200 rounded-md bg-gray-50">
                <h4 className="font-semibold text-green-800">Company Information</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <p><span className="font-medium">Name:</span> {company.name || 'N/A'}</p>
                  <p><span className="font-medium">Email:</span> {company.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {company.telephone || 'N/A'}</p>
                  <p><span className="font-medium">Address:</span> {company.address || 'N/A'}</p>
                  <p><span className="font-medium">Nearest City:</span> {company.nearestCity || 'N/A'}</p>
                </div>
                <button
                  className="inline-block px-4 py-2 mt-3 text-white transition bg-green-700 rounded hover:bg-green-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    const fileId = company.uploadedFileID;
                    if (fileId && onFileSelect) {
                      onFileSelect(fileId);
                    }
                  }}
                >
                  View Authorization Letter
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FullEmployerProfile;
