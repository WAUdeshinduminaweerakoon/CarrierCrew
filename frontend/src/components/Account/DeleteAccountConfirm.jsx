import React from 'react';
import axios from 'axios';

const DeleteAccount = () => {
  
  const onCancel = () => {
    console.log("Account deletion canceled");
  };

  const onConfirm = () => {
    console.log("Account deleted");
    // call your delete account API here
  };

  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-green-100 rounded-xl p-6 w-80 shadow-xl border border-green-500">
        <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
          Delete Account
        </h2>
        <div className="bg-green-200 p-4 rounded-md text-center text-gray-800 text-sm mb-6">
          <p>Deleting your account will remove all of your information</p>
          <p>from our database. This cannot be undone.</p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-green-300 text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-green-400 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
