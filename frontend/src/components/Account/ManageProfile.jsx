import React from 'react';
import { FaHome, FaBriefcase, FaUser, FaCog } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const ManageProfile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    role: 'Job Seeker',
  };

  const handleView = () => {
    toast.success('View Profile');
  };

  const handleUpdate = () => {
    toast.success('Update Profile');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      toast.error('Profile deleted');
    }
  };

  return (
    <div className="flex h-screen bg-green-100">
      <ToastContainer position="top-center" autoClose={3000}/>
      {/* Sidebar */}
      <div className="w-16 bg-white shadow-lg flex flex-col items-center py-6 space-y-6">
        <FaHome size={24} className="text-gray-700 cursor-pointer" />
        <FaBriefcase size={24} className="text-gray-700 cursor-pointer" />
        <FaUser size={24} className="text-gray-700 cursor-pointer" />
        <FaCog size={24} className="text-gray-700 cursor-pointer" />
      </div>

      {/* Profile Card */}
      <div className="flex justify-center items-center w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Profile</h2>
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <FaUser size={50} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600 mb-6">{user.role}</p>

          <div className="space-y-3">
            <button
              onClick={handleView}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              View Profile
            </button>
            <button
              onClick={handleUpdate}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Update Profile
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
