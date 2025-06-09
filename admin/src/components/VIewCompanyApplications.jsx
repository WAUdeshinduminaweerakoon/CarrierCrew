import React, { useState } from 'react';
import { HomeIcon } from 'lucide-react';
import API_ROUTES from '../configs/config';
import FullEmployerProfile from './FullEmployerProfile';
import { BriefcaseIcon } from 'lucide-react';

const FileCompanyApplications = () => {
  const [fileId, setFileId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

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
          {/* Left: Employer Profile */}
          <div className="p-6 overflow-y-auto bg-white rounded shadow">
            <h2 className="flex items-center gap-2 mb-4 text-2xl font-bold text-gray-800">
              <BriefcaseIcon className="w-6 h-6 text-green-600" />
              Employer Profiles
            </h2>
            <FullEmployerProfile
              onFileSelect={(id) => {
                setFileId(id);
                setPreviewUrl(`${API_ROUTES.ADMIN_UPLOAD}/view/${id}`);
              }}
            />
          </div>

          {/* Right: PDF Viewer */}
          <div className="flex flex-col p-6 bg-white rounded shadow">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">View or Download PDF</h2>
            <div className="flex-1 overflow-y-auto">
              {previewUrl ? (
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
              ) : (
                <p className="text-gray-500">Select an employer with an uploaded authorization letter to preview.</p>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileCompanyApplications;
