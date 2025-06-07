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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import API_ROUTES from "../../configs/config";

const EmployerHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [employerId, setEmployerId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 1;
  const navigate = useNavigate();
  const [totalApplicants, setTotalApplicants] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);
<<<<<<< HEAD
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [jobSeekerCount, setJobSeekerCount] = useState(null);

=======
>>>>>>> 2ccb2ee2897a7d2b8fa7f2ade0a79e87410365dd

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const userType = localStorage.getItem("userType");

<<<<<<< HEAD
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

      fetch(`${API_ROUTES.JOBSEEKER}/count`)
      .then((res) => res.json())
      .then((data) => setJobSeekerCount(data.count))
      .catch((err) =>
        console.error("Failed to fetch job seeker count:", err)
      );
      
  } else {
    alert("Login first.");
    navigate("/");
  }
}, []);
=======
    if (userType === "Employer" && storedUserId) {
      setEmployerId(storedUserId);

      fetch(`${API_ROUTES.JOBS}/employer/${storedUserId}`)
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          const total = data.reduce(
            (acc, job) => acc + (job.applicants?.length || 0),
            0
          );
          setTotalApplicants(total);
        })
        .catch((err) => {
          console.error("Failed to fetch jobs:", err);
          toast.error("Failed to load jobs. Try again later.");
        });
    } else {
      setTimeout(() => { navigate("/");}, 1000);
      toast.warn("Please login first.");
    }
  }, []);
>>>>>>> 2ccb2ee2897a7d2b8fa7f2ade0a79e87410365dd

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
    setTimeout(() => { navigate("/");}, 1500);
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex flex-col items-center min-h-screen overflow-x-hidden bg-green-100">
      <ToastContainer />
      <header className="w-full py-4 text-white bg-green-800 shadow-md">
        <div className="w-full max-w-screen-lg mx-auto px-4 flex items-center justify-between relative">
          <h1 className="font-semibold text-lg">CareerCrew.LK</h1>
          {/* Desktop Nav - Hidden on mobile */}
          <nav className="hidden sm:flex gap-4 text-sm items-center">
            <Link to="/employer/settings" className="py-2 px-2 hover:no-underline">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-2 hover:no-underline"
            >
              Logout
            </button>
          </nav>
          <button className="sm:hidden" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>
        </div>
        {/* Hamburger Dropdown for Mobile */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
          }`}
        >
          <nav className="bg-green-800 text-white text-center px-4 flex flex-col">
            <Link to="/employer/settings" className="py-3 hover:bg-green-700 w-full">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="py-3 hover:bg-green-700 w-full text-center"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

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
<<<<<<< HEAD
   <>
  
  <div className="w-full max-w-screen-sm px-4 pt-2">
  <div className="w-full max-w-screen-sm px-4 pt-2">
  <div className="bg-white text-green-900 font-medium rounded-xl shadow p-4 grid grid-cols-1 gap-2 text-center">
  <p>Total Job Posts: {jobs.length}</p>
  <p>Total Applicants: {totalApplicants}</p>
  <p>Total Job Seekers: {jobSeekerCount !== null ? jobSeekerCount : 'Loading...'}</p>
</div>

</div>

</div>


</>
=======
>>>>>>> 2ccb2ee2897a7d2b8fa7f2ade0a79e87410365dd

      {/* Stats Display */}
      <div className="w-full max-w-screen-sm px-4 pt-2">
        <div className="bg-white text-green-900 font-medium rounded-xl shadow p-4 grid grid-cols-1 gap-2 text-center">
          <p>Total Job Posts: {jobs.length}</p>
          <p>Total Applicants: {totalApplicants}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;
