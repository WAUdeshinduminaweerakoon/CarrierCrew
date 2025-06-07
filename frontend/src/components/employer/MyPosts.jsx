import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_ROUTES from "../../configs/config";
import Header from "./Header";

const MyPosts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);

  const JOBS_PER_PAGE = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

    if (userType === "Employer" && storedUserId) {
      setEmployerId(storedUserId);
      fetch(`${API_ROUTES.JOBS}/employer/${storedUserId}`)
        .then((res) => res.json())
        .then((data) => setJobs(data))
        .catch((err) => console.error("Failed to fetch jobs:", err));
    } else {
      alert("Login first.");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/images");
        if (Array.isArray(response.data)) {
          setCategoriesWithImages(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories with images:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const displayedJobs = jobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`${API_ROUTES.JOBS}/${jobToDelete._id}/delete`, { method: "DELETE" });
      setJobs(jobs.filter((job) => job._id !== jobToDelete._id));
      setShowDeleteModal(false);
      setJobToDelete(null);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 1500);
    } catch (error) {
      console.error("Failed to delete job:", error);
      alert("Delete failed. Please try again.");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setExpandedJobId(jobToDelete?._id || null);
    setJobToDelete(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
      <Header />

      {/* Dropdown Menu for Mobile */}
      <div className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <nav>
          <Link to="/employer/home" className="block py-2 hover:bg-green-700">Home</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
          <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
          <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
        </nav>
      </div>

      <div className="w-full max-w-screen-sm px-4 pt-4 text-lg font-semibold text-green-800">My Job Posts</div>

      <div className="grid w-full max-w-screen-sm gap-6 px-4 pt-6 pb-8">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No job advertisements available</p>
        ) : (
          displayedJobs.map((job) => {
            const isExpanded = expandedJobId === job._id;
            const matchedCategory = categoriesWithImages.find(
              (cat) => cat.name?.toLowerCase().trim() === job.jobTitle?.toLowerCase().trim()
            );
            const imageToShow = matchedCategory?.image || "/default-image.jpg";

            return (
              <div key={job._id} className="bg-white border border-green-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5">
                <div className="flex items-center gap-4">
                  <img src={imageToShow} alt={job.jobTitle} className="w-16 h-16 rounded-full object-cover border border-green-300" />
                  <div className="flex flex-col gap-1 text-green-900 text-sm">
                    <p><span className="font-semibold">Title:</span> {job.jobTitle}</p>
                    <p><span className="font-semibold">Location:</span> {job.location}</p>
                    <p><span className="font-semibold">Duration(hrs):</span> {job.duration}</p>
                    <p><span className="font-semibold">Payment(Rs):</span> {job.payment}</p>
                  </div>
                </div>

                {isExpanded && (
                  <div className="pt-4 text-green-900 text-sm space-y-1 mt-2 border-t border-green-200">
                    <p><span className="font-semibold">District:</span> {job.district}</p>
                    <p><span className="font-semibold">From Date:</span> {new Date(job.dateFrom).toLocaleDateString()}</p>
                    <p><span className="font-semibold">To Date:</span> {new Date(job.dateTo).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time From:</span> {job.timeFrom}</p>
                    <p><span className="font-semibold">Time To:</span> {job.timeTo}</p>
                    <p><span className="font-semibold">Vacancies:</span> {job.vacancies}</p>
                    <p><span className="font-semibold">Description:</span> {job.description || "N/A"}</p>

                    <div className="flex flex-wrap justify-between gap-2 pt-4">
                      <button onClick={() => navigate(`/employer/edit-post/${job._id}`)} className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Edit</button>
                      <button onClick={() => handleDeleteClick(job)} className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Delete</button>
                      <button onClick={() => setExpandedJobId(null)} className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Show Less</button>
                    </div>
                  </div>
                )}

                {!isExpanded && (
                  <div className="flex justify-end pt-4">
                    <button onClick={() => setExpandedJobId(job._id)} className="px-4 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">Show More</button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {jobs.length > JOBS_PER_PAGE && (
        <div className="flex items-center justify-between w-full max-w-screen-sm px-4 pb-8 text-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >Previous</button>
          <span className="font-medium text-green-900">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >Next</button>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && jobToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold text-red-600 mb-2">Delete Job Post</h2>
            <p className="text-sm text-gray-700 mb-4">
              Are you sure you want to delete this job? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleCancelDelete} className="px-4 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400">Cancel</button>
              <button onClick={handleConfirmDelete} className="px-4 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {showSuccessMessage && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-600 text-white rounded shadow-lg">
          Job post deleted successfully!
        </div>
      )}
    </div>
  );
};

export default MyPosts;
