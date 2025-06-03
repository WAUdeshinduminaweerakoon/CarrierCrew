import React, { useState, useEffect } from "react";
import { FaBars, FaFilter } from "react-icons/fa"; // Hamburger and Filter icons
import { Link, useNavigate } from "react-router-dom";
import API_ROUTES from '../../configs/config';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [workingHours, setWorkingHours] = useState([0, 12]);
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [expandedJobId, setExpandedJobId] = useState(null);


  const navigate = useNavigate();


    const [jobseekerId, setEmployerId] = useState("");
  
    useEffect(() => {
      const storedUserId = localStorage.getItem("userId");
      const userType = localStorage.getItem("userType");
      if (userType === "JobSeeker" && storedUserId) {
        setEmployerId(storedUserId);
      } else {
        alert("Login First.");
        navigate("/");
      }
    }, []);

  

    useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${API_ROUTES.JOBS}/all`);
        const data = await response.json();
        console.log("Fetched job data:", data);

        if (Array.isArray(data)) {
          setJobAds(data);
        } else if (Array.isArray(data.jobs)) {
          setJobAds(data.jobs);
        } else {
          console.error("Unexpected job data structure", data);
          setJobAds([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobAds([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_ROUTES.LOCATIONS}/all`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setLocations(data);
        } else {
          console.error("Unexpected location data structure", data);
          setLocations([]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLocationDropdown = () => {
    setIsLocationOpen(!isLocationOpen);
    setIsCategoryOpen(false);
  };
  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setIsLocationOpen(false);
  };
  const toggleFilterModal = () => setIsFilterOpen(!isFilterOpen);

  const [locations, setLocations] = useState([]);
  const [expandedDistrict, setExpandedDistrict] = useState(null); // to handle dropdown toggle

    useEffect(() => {
      const fetchLocations = async () => {
        try {
          const response = await fetch(`${API_ROUTES.LOCATIONS}/all`);
          const data = await response.json();
          setLocations(data);
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      };

      fetchLocations();
    }, []);



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

        <div className="w-full max-w-screen-sm px-4 mt-2">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full p-2 border border-green-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
          />
        </div>

        <div className="flex items-center w-full max-w-screen-sm gap-2 px-4 mt-4">
          <button
            className="flex-1 py-2 text-sm text-white bg-green-700 rounded-md hover:bg-green-600"
            onClick={toggleLocationDropdown}
          >
            {selectedLocation}
          </button>
          <button
            className="flex-1 py-2 text-sm text-white bg-green-700 rounded-md hover:bg-green-600"
            onClick={toggleCategoryDropdown}
          >
            {selectedCategory}
          </button>
          <button
            className="p-2 text-green-800 bg-white rounded-full shadow hover:bg-green-200"
            onClick={toggleFilterModal}
          >
            <FaFilter className="text-xl" />
          </button>
        </div>
      </header>

      {isLocationOpen && (
        <div className="w-full max-w-screen-sm px-4 mt-2 overflow-y-auto bg-white rounded shadow max-h-96">
          
          {locations.map((location) => (
            <div key={location._id}>
              <div
                className="py-2 font-semibold cursor-pointer hover:bg-green-100"
                onClick={() =>
                  setExpandedDistrict(
                    expandedDistrict === location.name ? null : location.name
                  )
                }
              >
                {location.name}
              </div>
              {expandedDistrict === location.name &&
                Array.isArray(location.areas) &&
                location.areas.map((area) => (
                  <div
                    key={area._id}
                    className="py-1 pl-4 text-sm cursor-pointer hover:bg-green-50"
                    onClick={() => {
                      setSelectedLocation(area.name);
                      setIsLocationOpen(false);
                      setExpandedDistrict(null);
                    }}
                  >
                    {area.name}
                  </div>
                ))}
            </div>
          ))}


        </div>
      )}



      {isCategoryOpen && (
        <div className="w-full max-w-screen-sm px-4 mt-2 bg-white rounded shadow">
          {categories.map((category) => (
            <div
              key={category._id}
              className="py-2 cursor-pointer hover:bg-green-100"
              onClick={() => {
                setSelectedCategory(category.name);
                setIsCategoryOpen(false);
              }}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}


      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="w-full max-w-screen-sm px-6 py-4 bg-white rounded-lg shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-green-800">Filter Jobs</h3>

            <div className="mb-4">
              <label htmlFor="salary" className="block mb-2 text-sm text-green-800">Salary Range</label>
              <input
                type="range"
                id="salary"
                min="0"
                max="100000"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>Rs. {salaryRange[0]}</span>
                <span>Rs. {salaryRange[1]}</span>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="working-hours" className="block mb-2 text-sm text-green-800">Working Hours</label>
              <input
                type="range"
                id="working-hours"
                min="0"
                max="12"
                value={workingHours[1]}
                onChange={(e) => setWorkingHours([workingHours[0], Number(e.target.value)])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>{workingHours[0]} hrs</span>
                <span>{workingHours[1]} hrs</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700"
                onClick={toggleFilterModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700"
                onClick={() => {
                  console.log("Applied Filters:", { salaryRange, workingHours });
                  toggleFilterModal();
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`absolute left-0 top-8 w-full bg-green-800 text-white text-center mt-4 sm:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <nav>
          <Link to="/home" className="block py-2 hover:bg-green-700">All Jobs</Link>
          <Link to="/" className="block py-2 hover:bg-green-700">Login</Link>
          <a href="/jobseeker/profile" className="block py-2 hover:bg-green-700">Profile</a>
          <a href="#" className="block py-2 hover:bg-green-700">My Applications</a>
          <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
          <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
        </nav>
      </div>

      <main className="flex items-center justify-center flex-1 w-full max-w-screen-sm px-4 text-center">
      <div className="w-full mt-6 space-y-4">
        {Array.isArray(currentJobs) && currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div
              key={job._id}
              className="p-4 transition bg-white rounded-md shadow cursor-pointer hover:bg-green-50"
              onClick={() =>
                setExpandedJobId(expandedJobId === job._id ? null : job._id)
              }
            >
              <div className="flex items-center gap-4">
                <img
                  src={job.image}
                  alt={job.category}
                  className="object-cover w-16 h-16 rounded-md"
                />
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-green-800">
                    {job.jobTitle}
                  </h3>
                  <p className="text-sm text-gray-600">{job.location}</p>
                  <p className="text-sm text-gray-600">{job.duration}</p>
                  <p className="text-sm text-gray-600">
                    {job.dateFrom ? job.dateFrom.slice(0, 10) : ""}
                  </p>
                  <p className="text-sm font-medium text-green-700">
                    {job.payment}
                  </p>
                </div>
              </div>

              {expandedJobId === job._id && (
                <div className="mt-4 space-y-2 text-sm text-left text-gray-700">
                  <p>
                    <strong>Working Hours:</strong> {job.duration}
                  </p>
                  <p>
                    <strong>Working Days:</strong>{" "}
                    {job.dateFrom ? job.dateFrom.slice(0, 10) : ""} -{" "}
                    {job.dateTo ? job.dateTo.slice(0, 10) : ""}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.payment}
                  </p>
                  <p>
                    <strong>Description:</strong> {job.description}
                  </p>

                  <button
                    className="w-full py-2 mt-3 text-white transition bg-green-700 rounded hover:bg-green-800 disabled:opacity-50"
                    onClick={async (e) => {
                      e.stopPropagation();
                      try {
                        const response = await fetch(
                          API_ROUTES.JOBS + "/" + job._id + "/apply",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              userId: jobseekerId,
                            }),
                          }
                        );

                        const result = await response.json();

                  if (response.ok) {
                    alert("Application submitted successfully!");
                  } else {
                    alert(`Application failed: ${result.message || "Unknown error"}`);
                  }
                } catch (err) {
                  console.error("Application error:", err);
                  alert("Something went wrong while applying.");
                }
              }}
            >
              Apply Now
            </button>

                  </div>
                )}
              </div>

            ))
          ) : (
            <p className="text-gray-600">No job advertisements available.</p>
          )}
        </div>
      </main>

      <ToastContainer position="top-center" autoClose={3000} />

    </div>
  );
};

export default Home;
