import React, { useState } from 'react';
import { HomeIcon } from 'lucide-react';
import API_ROUTES from '../configs/config';
import FullEmployerProfile from './FullEmployerProfile';

const FileCompanyApplications = () => {
  const [fileId, setFileId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const handleView = () => {
    if (!fileId.trim()) return alert('Please enter a valid File ID');
    setPreviewUrl(`${API_ROUTES.ADMIN_UPLOAD}/view/${fileId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800">CareerCrew.LK</h1>
        </div>
        <button
          className="flex items-center text-gray-600 hover:text-blue-600"
          onClick={() => window.location.href = "/admin"}
        >
          <HomeIcon className="w-5 h-5 mr-1" /> Home
        </button>
      </header>

      <main className="flex-grow p-8 bg-gray-100">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 h-[calc(100vh-100px)]">
          {/* Employer Profile Section - Left */}
          <div className="p-6 overflow-y-auto bg-white rounded shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Employer Profile</h2>
            <FullEmployerProfile />
          </div>

          {/* PDF Viewer Section - Right (Fixed height) */}
          <div className="flex flex-col p-6 bg-white rounded shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">View or Download PDF</h2>
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
              className="px-4 py-2 mb-4 text-white bg-blue-600 rounded"
            >
              View File
            </button>

            <div className="flex-1 overflow-y-auto">
              {previewUrl && (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileCompanyApplications;
