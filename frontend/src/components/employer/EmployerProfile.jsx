import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployerProfile() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/employer/home");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md pb-4 rounded-2xl shadow-xl border border-green-200 bg-white">
        <div className="bg-green-400 text-center rounded-t-2xl py-2 text-white text-lg font-semibold">
          Employer Profile
        </div>
        <div className="p-4 border border-green-300 mx-4 mt-4 rounded-xl">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-300 flex items-center justify-center text-white text-2xl font-bold">
              <span>👤</span>
            </div>
            <h2 className="text-xl font-semibold mt-2">ABC Pvt Limited.</h2>
            <p className="text-sm text-gray-500">ABC@gmail.com</p>
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <p><strong>Name</strong> : ABC Pvt Limited.</p>
            <p><strong>Contact</strong> : +9470987654</p>
            <p><strong>Address</strong> : Raja Mawatha, Colombo 04.</p>
            <p><strong>Nearest City</strong> : Kottawa.</p>

            <div className="bg-gray-100 rounded-md p-3 border border-gray-300">
              <p className="text-justify text-sm">
                <strong>Description</strong> : ABC connects customers with local restaurants through an app or website, providing convenient access to a wide variety of meals delivered directly to their doorsteps. It streamlines the ordering process, offering real-time tracking and contactless delivery options for customer satisfaction.
              </p>
            </div>

            <div className="flex items-center mt-2">
              <strong className="mr-2">Rating</strong> :
              <div className="flex space-x-1 text-yellow-400">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
                ))}
              </div>
            </div>

            <p><strong>Authorized Person</strong> : John Smith</p>
            <div className="mt-4 mx-4 flex justify-between items-center border-t pt-4 border-blue-200">
               <span className="font-small text-gray-700"><strong>Show Company Profile</strong></span>
                 <button
                      className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => navigate("/employer/companyprofile")}
                 >
                  View
                 </button>
            </div>

          </div>

          <div className="flex justify-between mt-6">
            <button className="px-4 py-1 border rounded text-green-700 border-green-600 hover:bg-green-200"
            type="button"
            onClick={handleBack}
            >Back</button>
            <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-700">Edit</button>
            <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
