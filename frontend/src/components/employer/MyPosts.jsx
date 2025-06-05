// import React, { useEffect, useState } from "react";
// import { FaBars } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import API_ROUTES from "../../configs/config";

// const MyPosts = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [jobs, setJobs] = useState([]);
//   const [employerId, setEmployerId] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [expandedJobId, setExpandedJobId] = useState(null);
//   const JOBS_PER_PAGE = 5;

//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUserId = localStorage.getItem("userId");
//     const userType = localStorage.getItem("userType");

//     if (userType === "Employer" && storedUserId) {
//       setEmployerId(storedUserId);

//       fetch(`${API_ROUTES.JOBS}/employer/${storedUserId}`)
//         .then((res) => res.json())
//         .then((data) => setJobs(data))
//         .catch((err) => console.error("Failed to fetch jobs:", err));
//     } else {
//       alert("Login first.");
//       navigate("/");
//     }
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
//   const displayedJobs = jobs.slice(
//     (currentPage - 1) * JOBS_PER_PAGE,
//     currentPage * JOBS_PER_PAGE
//   );

//   return (
//     <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
//       {/* Header */}
//       <header className="w-full py-4 text-white bg-green-800 shadow-md">
//         <div className="flex items-center justify-between w-full max-w-screen-sm px-4 text-sm">
//           <button className="text-white" onClick={toggleMenu}>
//             <FaBars className="text-2xl" />
//           </button>
//           <h1 className="font-semibold truncate">CareerCrew.LK</h1>
//         </div>
//       </header>

//       {/* Menu */}
//       <div
//         className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
//           isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
//         }`}
//       >
//         <nav>
//           <Link to="/employer/home" className="block py-2 hover:bg-green-700">Home</Link>
//           <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
//           <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
//           <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
//           <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
//         </nav>
//       </div>

//       <div className="w-full max-w-screen-sm px-4 pt-4 text-lg font-semibold text-green-800">
//         My Job Posts
//       </div>

//       <div className="grid w-full max-w-screen-sm gap-4 px-4 pt-6 pb-4">
//         {jobs.length === 0 ? (
//           <p className="text-center text-gray-500">No job advertisements available</p>
//         ) : (
//           displayedJobs.map((job) => {
//             const isExpanded = expandedJobId === job._id;

//             return (
//               <div key={job._id} className="p-4 bg-white rounded-lg shadow-md">
//                 <div className="flex items-center gap-6">
//                   <img
//                     src={job.logoUrl || "/images/default-job.png"}
//                     alt={job.jobTitle}
//                     className="object-contain w-20 h-20"
//                   />
//                   <div className="text-sm text-green-900 space-y-1">
//                     <p><span className="font-semibold">Title:</span> {job.jobTitle}</p>
//                     <p><span className="font-semibold">Location:</span> {job.location}</p>
//                     <p><span className="font-semibold">Duration(hrs):</span> {job.duration}</p>
//                     <p><span className="font-semibold">Payment(Rs):</span> {job.payment}</p>
//                   </div>
//                 </div>

//                 {isExpanded && (
//                   <div className="pt-4 text-sm text-green-900 space-y-1">
//                     <p><span className="font-semibold">From Date:</span> {job.fromDate}</p>
//                     <p><span className="font-semibold">To Date:</span> {new Date(job.dateTo).toLocaleDateString()}</p>
//                     <p><span className="font-semibold">Time From:</span> {job.timeFrom}</p>
//                     <p><span className="font-semibold">Time To:</span> {job.timeTo}</p>
//                     <p><span className="font-semibold">Vacancies:</span> {job.vacancies}</p>
//                     <p><span className="font-semibold">Description:</span> {job.description || "N/A"}</p>
//                   </div>
//                 )}

//                 {/* Bottom Buttons */}
//                 <div className="flex justify-between pt-4">
//                   <button
//                     onClick={() => navigate(`/edit-job/${job._id}`)}
//                     className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
//                   >
//                     Edit Job
//                   </button>

//                   <button
//                     onClick={() =>
//                       setExpandedJobId((prevId) => (prevId === job._id ? null : job._id))
//                     }
//                     className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
//                   >
//                     {isExpanded ? "Hide" : "More"}
//                   </button>
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {jobs.length > JOBS_PER_PAGE && (
//         <div className="flex items-center justify-between w-full max-w-screen-sm px-4 pb-8 text-sm">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded ${
//               currentPage === 1
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             }`}
//           >
//             Previous
//           </button>

//           <span className="font-medium text-green-900">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded ${
//               currentPage === totalPages
//                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 : "bg-green-500 text-white hover:bg-green-600"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyPosts;

import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from "../../configs/config";

const MyPosts = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedJobId, setExpandedJobId] = useState(null);
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const displayedJobs = jobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
      {/* Header */}
      <header className="w-full py-4 text-white bg-green-800 shadow-md">
        <div className="flex items-center justify-between w-full max-w-screen-sm px-4 text-sm">
          <button className="text-white" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
          <h1 className="font-semibold truncate">CareerCrew.LK</h1>
        </div>
      </header>

      {/* Menu */}
      <div
        className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav>
          <Link to="/employer/home" className="block py-2 hover:bg-green-700">Home</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
          <Link to="/employer/profile" className="block py-2 hover:bg-green-700">Profile</Link>
          <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
          <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
        </nav>
      </div>

      {/* Title */}
      <div className="w-full max-w-screen-sm px-4 pt-4 text-lg font-semibold text-green-800">
        My Job Posts
      </div>

      {/* Job Posts */}
      <div className="grid w-full max-w-screen-sm gap-4 px-4 pt-6 pb-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No job advertisements available</p>
        ) : (
          displayedJobs.map((job) => {
            const isExpanded = expandedJobId === job._id;

            return (
              <div
                key={job._id}
                className="p-4 bg-white rounded-lg shadow-md"
              >
                {/* Basic Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={job.logoUrl || "/images/default-job.png"}
                    alt={job.jobTitle}
                    className="object-contain w-20 h-20"
                  />
                  <div className="text-sm text-green-900 flex flex-col gap-2">
                    <p><span className="font-semibold">Title:</span> {job.jobTitle}</p>
                    <p><span className="font-semibold">Location:</span> {job.location}</p>
                    <p><span className="font-semibold">Duration(hrs):</span> {job.duration}</p>
                    <p><span className="font-semibold">Payment(Rs):</span> {job.payment}</p>
                  </div>
                </div>

                {/* Expanded Info */}
                {isExpanded && (
                  <div className="pt-6 text-sm text-green-900 leading-relaxed flex flex-col gap-2 mt-2">
                    <p><span className="font-semibold">From Date:</span> {new Date(job.dateFrom).toLocaleDateString()}</p>
                    <p><span className="font-semibold">To Date:</span> {new Date(job.dateTo).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Time From:</span> {job.timeFrom}</p>
                    <p><span className="font-semibold">Time To:</span> {job.timeTo}</p>
                    <p><span className="font-semibold">Vacancies:</span> {job.vacancies}</p>
                    <p><span className="font-semibold">Description:</span> {job.description || "N/A"}</p>

                    {/* Button Row */}
                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => navigate(`/edit-job/${job._id}`)}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Edit Job
                      </button>
                      <button
                        onClick={() =>
                          setExpandedJobId((prevId) => (prevId === job._id ? null : job._id))
                        }
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Hide
                      </button>
                    </div>
                  </div>
                )}

                {/* Show "More" Button if not expanded */}
                {!isExpanded && (
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setExpandedJobId(job._id)}
                      className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      More
                    </button>
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
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Previous
          </button>

          <span className="font-medium text-green-900">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPosts;

