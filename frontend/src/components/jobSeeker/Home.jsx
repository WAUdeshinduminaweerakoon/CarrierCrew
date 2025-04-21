import React, { useState } from "react";
import { FaBars, FaFilter } from "react-icons/fa"; // Hamburger and Filter icons

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [salaryRange, setSalaryRange] = useState([0, 100000]); // Default salary range
  const [workingHours, setWorkingHours] = useState([0, 12]); // Default working hours (in hours per day)
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedJob, setSelectedJob] = useState(null);

  const jobAds = [
    {
      id: 1,
      category: "Waiter",
      location: "Colombo",
      hours: "6 hours/day",
      days: "Mon - Fri",
      salary: "LKR 3000/day",
      image: "/images/waiter.png"
    },
    {
      id: 2,
      category: "Delivery Rider",
      location: "Kandy",
      hours: "4 hours/day",
      days: "Mon - Sat",
      salary: "LKR 2500/day",
      image: "/images/delivery.png"
    },
    {
      id: 3,
      category: "Helper",
      location: "Galle",
      hours: "8 hours/day",
      days: "Weekends",
      salary: "LKR 2000/day",
      image: "/images/helper.png"
    },
    {
      id: 4,
      category: "Waiter",
      location: "Colombo",
      hours: "6 hours/day",
      days: "Mon - Fri",
      salary: "LKR 3000/day",
      image: "/images/waiter.png"
    },
    {
      id: 5,
      category: "Waiter",
      location: "Colombo",
      hours: "6 hours/day",
      days: "Mon - Fri",
      salary: "LKR 3000/day",
      image: "/images/waiter.png"
    },
    {
      id: 6,
      category: "Waiter",
      location: "Colombo",
      hours: "6 hours/day",
      days: "Mon - Fri",
      salary: "LKR 3000/day",
      image: "/images/waiter.png"
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLocationDropdown = () => {
    setIsLocationOpen(!isLocationOpen);
    setIsCategoryOpen(false); // Close category dropdown if location is opened
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setIsLocationOpen(false); // Close location dropdown if category is opened
  };

  const toggleFilterModal = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const districts = [
    "Colombo", "Kandy", "Galle", "Jaffna", "Matara", "Anuradhapura", 
    "Trincomalee", "Kurunegala", "Negombo", "Batticaloa", "Badulla"
  ];

  const categories = [
    "Waiter", "Helper", "Delivery Rider", "Cleaner", "Store Assistant", 
    "Tutor", "Security Guard", "Driver"
  ];

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center overflow-x-hidden">
      {/* Header */}
      <header className="bg-green-800 text-white w-full py-4 shadow-md">
        <div className="w-full max-w-screen-sm px-4 flex justify-between items-center text-sm">
          {/* Hamburger menu icon */}
          <button className="text-white" onClick={toggleMenu}>
            <FaBars className="text-2xl" />
          </button>

          <h1 className="font-semibold truncate">CareerCrew.LK</h1>
        </div>

        {/* Search bar below header */}
        <div className="w-full max-w-screen-sm px-4 mt-2">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full p-2 rounded-lg border border-green-800 focus:outline-none focus:ring-2 focus:ring-green-800"
          />
        </div>

        <div className="w-full max-w-screen-sm px-4 mt-4 flex items-center gap-2">
          {/* Location Button */}
          <button
            className="flex-1 bg-green-700 text-white text-sm py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={toggleLocationDropdown}
          >
            {selectedLocation}
          </button>

          {/* Category Button */}
          <button
            className="flex-1 bg-green-700 text-white text-sm py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={toggleCategoryDropdown}
          >
            {selectedCategory}
          </button>

          {/* Filter Icon */}
          <button
            className="p-2 text-green-800 bg-white rounded-full shadow hover:bg-green-200 transition duration-200"
            onClick={toggleFilterModal}
          >
            <FaFilter className="text-xl" />
          </button>
        </div>


      </header>

      {isLocationOpen && (
        <div className="mt-2 bg-white rounded shadow w-full max-w-screen-sm px-4">
          {districts.map((district) => (
            <div
              key={district}
              className="py-2 cursor-pointer hover:bg-green-100"
              onClick={() => {
                setSelectedLocation(district);
                setIsLocationOpen(false);
              }}
            >
              {district}
            </div>
          ))}
        </div>
      )}

      {isCategoryOpen && (
        <div className="mt-2 bg-white rounded shadow w-full max-w-screen-sm px-4">
          {categories.map((category) => (
            <div
              key={category}
              className="py-2 cursor-pointer hover:bg-green-100"
              onClick={() => {
                setSelectedCategory(category);
                setIsCategoryOpen(false);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      )}



      {/* Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-screen-sm px-6 py-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-800 mb-4">Filter Jobs</h3>

            {/* Salary Range */}
            <div className="mb-4">
              <label htmlFor="salary" className="block text-sm text-green-800 mb-2">Salary Range</label>
              <input
                type="range"
                id="salary"
                min="0"
                max="100000"
                value={salaryRange[1]}
                onChange={(e) => setSalaryRange([salaryRange[0], e.target.value])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>${salaryRange[0]}</span>
                <span>${salaryRange[1]}</span>
              </div>
            </div>

            {/* Working Hours */}
            <div className="mb-4">
              <label htmlFor="working-hours" className="block text-sm text-green-800 mb-2">Working Hours</label>
              <input
                type="range"
                id="working-hours"
                min="0"
                max="12"
                value={workingHours[1]}
                onChange={(e) => setWorkingHours([workingHours[0], e.target.value])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>{workingHours[0]} hrs</span>
                <span>{workingHours[1]} hrs</span>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
                onClick={toggleFilterModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700"
                onClick={() => {
                  console.log("Applied Filters:", { salaryRange, workingHours });
                  toggleFilterModal(); // Close the modal after applying filters
                }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 top-8 w-full bg-green-800 text-white text-center mt-4 sm:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
        >
          <nav>
            <a href="#" className="block py-2 hover:bg-green-700">All Jobs</a>
            <a href="#" className="block py-2 hover:bg-green-700">Profile</a>
            <a href="#" className="block py-2 hover:bg-green-700">My Applications</a>
            <a href="#" className="block py-2 hover:bg-green-700">Settings</a>
            <a href="#" className="block py-2 hover:bg-green-700">Logout</a>
          </nav>
        </div>

      {/* Body */}
      <main className="flex-1 w-full max-w-screen-sm flex items-center justify-center px-4 text-center">
        
        
      <div className="mt-6 space-y-4 w-full">
        {jobAds.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="flex bg-white shadow rounded-md p-4 items-center gap-4 cursor-pointer hover:bg-green-50 transition"
          >
            <img
              src={job.image}
              alt={job.category}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-800">{job.category}</h3>
              <p className="text-sm text-gray-600"> {job.location}</p>
              <p className="text-sm text-gray-600"> {job.hours}</p>
              <p className="text-sm text-gray-600"> {job.days}</p>
              <p className="text-sm text-green-700 font-medium"> {job.salary}</p>
            </div>
          </div>
        ))}
      </div>


        

      </main>

        {selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
              <img
                src={selectedJob.image}
                alt={selectedJob.category}
                className="w-20 h-20 object-cover rounded mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-green-800 text-center">{selectedJob.category}</h2>
              <p className="text-sm text-gray-600 text-center mb-4">{selectedJob.location}</p>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Working Hours:</strong> {selectedJob.hours}</p>
                <p><strong>Working Days:</strong> {selectedJob.days}</p>
                <p><strong>Salary:</strong> {selectedJob.salary}</p>
              </div>

                    {/* Apply button */}
                      <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => alert(`Applied for ${selectedJob.category} in ${selectedJob.location}`)}
                      >
                        Apply Now
                      </button>
            </div>
          </div>
        )}

    </div>
  );
};

export default Home;