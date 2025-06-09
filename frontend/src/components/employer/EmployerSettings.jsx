import { useState } from "react";
import { HomeIcon, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API_ROUTES from "../../configs/config";
import Header from "./Header";

const EmployerSettings = () => {
  const [activeTab, setActiveTab] = useState("employerAccounts");
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const employerId = localStorage.getItem("userId");

  const handleDeleteProfile = async () => {
    if (!confirmChecked) {
      setErrorMessage("You must confirm checkbox before proceeding.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    try {
      const verifyResponse = await fetch(`${API_ROUTES.AUTH}/employer/verifypassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: employerId, password }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setErrorMessage(verifyData.message || "Password verification failed.");
        return;
      }

      const deleteResponse = await fetch(`${API_ROUTES.AUTH}/employer/${employerId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!deleteResponse.ok) {
        const deleteData = await deleteResponse.json();
        setErrorMessage(deleteData.message || "Account deletion failed.");
        return;
      }

      setSuccessMessage("Your account has been deleted successfully.");
      localStorage.clear();
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Deletion error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header/>

      <div className="flex flex-grow flex-col md:flex-row">

        <aside className="hidden md:block w-64 bg-green-200 p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Settings</h2>
          <ul className="space-y-2">
            <li>
              <button
                className={`block w-full text-left ${activeTab === 'employerAccounts' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                onClick={() => setActiveTab('employerAccounts')}
              >
                Manage Employer Accounts
              </button>
            </li>
            <li>
              <button
                className={`block w-full text-left ${activeTab === 'accountDeletion' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                onClick={() => setActiveTab('accountDeletion')}
              >
                Employer Profile Deletion
              </button>
            </li>
          </ul>
        </aside>

        <main className="flex-grow p-6 bg-green-100">
          {activeTab === 'employerAccounts' && (
            <div className="text-gray-700 text-center text-lg font-medium">Employer account management content goes here.</div>
          )}

          {activeTab === 'accountDeletion' && (
            <div className="bg-green-100 p-6 rounded-lg shadow max-w-xl mx-auto w-full">
              <h2 className="text-2xl font-bold mb-4">Profile Deletion</h2>
              <p className="text-gray-700 mb-2">
                <strong>This action will delete your employer profile and all related information from CareerCrew.LK permanently.</strong>
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Would you like to proceed with the account deletion process</strong>
              </p>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={confirmChecked}
                    onChange={(e) => setConfirmChecked(e.target.checked)}
                    className="mr-2"
                  />
                  Confirm Deletion
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Please enter your account password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-lg px-3 py-2 border border-green-500 rounded"
                  placeholder="Enter your password"
                />
              </div>
              {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
              {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
              <div className="flex justify-between flex-wrap sm:justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => navigate("/employer/home")}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={handleDeleteProfile}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployerSettings;