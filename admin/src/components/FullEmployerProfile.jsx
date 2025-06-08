import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FullEmployerProfile = ({ onFileSelect }) => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = `http://localhost:5000/api/employers/`;

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
    <div className="w-full max-w-4xl p-4 mx-auto space-y-4 transition bg-white rounded-lg shadow hover:bg-green-50">
      {employers.map((employer) => {
        const isExpanded = expandedIds.includes(employer._id);
        const company = employer.company || {};

        return (
          <div
            key={employer._id}
            className="p-4 border rounded cursor-pointer hover:bg-green-50"
            onClick={() => toggleExpand(employer._id)}
          >
            <h3 className="text-lg font-semibold text-green-800">
              {(employer.firstName || '') + ' ' + (employer.lastName || '')}
            </h3>
            <p className="text-sm text-gray-600">{employer.location || 'No Location'}</p>
            <p className="text-sm text-gray-600">{employer.email || 'No Email'}</p>
            <p className="text-sm text-gray-600">{employer.mobile || 'No Mobile'}</p>

            {isExpanded && (
              <div className="mt-2 space-y-1 text-sm text-gray-700">
                <p className="font-bold">Company Information:</p>
                <p>{company.name || 'No Company Name'}</p>
                <p>{company.email || 'No Company Email'}</p>
                <p>{company.telephone || 'No Company Telephone'}</p>
                <p>{company.address || 'No Company Address'}</p>
                <p>{company.nearestCity || 'No Nearest City'}</p>

                <button
                  className="px-3 py-1 mt-2 text-white bg-green-700 rounded hover:bg-green-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    const fileId = company.uploadedFileID;
                    if (fileId && onFileSelect) {
                      onFileSelect(fileId);
                    }
                  }}
                >
                  Authorization Letter
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
