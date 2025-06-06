import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaPlus,
  FaClipboardList,
  FaUser,
  FaComments,
  FaRegStar,
  FaFileAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from "../../configs/config";

const EmployerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 1;
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);
  const [totalApplicants, setTotalApplicants] = useState(0);

  useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  const userType = localStorage.getItem("userType");

  if (userType === "Employer" && storedUserId) {
    setEmployerId(storedUserId);

    fetch(`${API_ROUTES.JOBS}/employer/${storedUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);

        // 🧠 Calculate total applicants from all job posts
        const total = data.reduce(
          (acc, job) => acc + (job.applicants?.length || 0),
          0
        );
        setTotalApplicants(total);
      })
      .catch((err) => console.error("Failed to fetch jobs:", err));
  } else {
    alert("Login first.");
    navigate("/");
  }
}, []);


  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
      <header className="w-full py-4 text-white bg-green-800 shadow-md">
        
      <div className="w-full max-w-screen-lg mx-auto px-4 flex items-center justify-between relative">
        
        <h1 className="font-semibold text-lg">CareerCrew.LK</h1>

        
        <nav className="hidden sm:flex gap-4 text-sm items-center">
         
          <Link to="#" className="py-2 px-2 hover:underline">Settings</Link>
          <Link to="/" className="py-2 px-2 hover:underline">Logout</Link>
        </nav>

        
        <button className="sm:hidden" onClick={toggleMenu}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav className="bg-green-800 text-white text-center px-4">
          
          <Link to="/employer/settings" className="block py-2 hover:bg-green-700">Settings</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Logout</Link>
        </nav>
      </div>
      </header>

      <div
        className={`absolute left-0 top-16 w-full bg-green-800 text-white text-center sm:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <nav>
          <a href="#" className="block py-2 hover:bg-green-700">
            Settings
          </a>
          <a href="#" className="block py-2 hover:bg-green-700">
            Logout
          </a>
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="w-full max-w-screen-sm px-4 pt-4">
        <div className="p-4 bg-white shadow-md rounded-xl">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                label: "My Posts",
                icon: <FaClipboardList />,
                onClick: () => navigate("/employer/my-posts"),
              },
              {
                label: "New Job",
                icon: <FaPlus />,
                onClick: () => navigate("/employer/create-job"),
              },
              {
                label: "Applications",
                icon: <FaFileAlt />,
                onClick: () => navigate("/employer/view-applications"),
              },
              {
                label: "Profile",
                icon: <FaUser />,
                onClick: () =>
                  navigate("/employer/profile", { state: { employerId } }),
              },
              { label: "Chat", icon: <FaComments /> },
              {
                label: "Subscriptions",
                icon: <FaRegStar />,
                onClick: () => navigate("/employer/subs-plans"),
              },
            ].map(({ label, icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex flex-col items-center py-6 text-sm font-semibold text-green-800 transition rounded-lg shadow bg-green-50 hover:bg-green-200"
              >
                <div className="text-2xl">{icon}</div>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
   <>
  
  <div className="w-full max-w-screen-sm px-4 pt-2">
  <div className="w-full max-w-screen-sm px-4 pt-2">
  <div className="bg-white text-green-900 font-medium rounded-xl shadow p-4 grid grid-cols-1 gap-2 text-center">
    <p>Total Job Posts: {jobs.length}</p>
    <p>Total Applicants: {totalApplicants}</p>
  </div>
</div>

</div>


</>

      </div>
    
    
  );
};

export default EmployerHome;
