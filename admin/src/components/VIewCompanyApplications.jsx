

import React, { useState } from 'react';
import { HomeIcon } from 'lucide-react';

const FileCompanyApplications = () => {
  const [fileId, setFileId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleView = () => {
    if (!fileId.trim()) return alert('Please enter a valid File ID');
    setPreviewUrl(`http://localhost:5000/api/upload/view/${fileId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800">CareerCrew.LK</h1>
        </div>
        <button
          className="text-gray-600 hover:text-blue-600 flex items-center"
          onClick={() => window.location.href = "/admin"}
        >
          <HomeIcon className="h-5 w-5 mr-1" /> Home
        </button>
      </header>

      <main className="flex-grow p-8 bg-gray-100">
        <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">View or Download PDF</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter File ID"
              value={fileId}
              onChange={(e) => setFileId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handleView}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            View File
          </button>

          {previewUrl && (
            <div className="mt-6">
              <iframe
                src={previewUrl}
                className="w-full h-[600px] border"
                title="PDF Preview"
              />
              <p className="mt-2 text-sm text-gray-600">
                If the PDF doesn't display,{' '}
                <a
                  href={previewUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  click here to download
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FileCompanyApplications;

