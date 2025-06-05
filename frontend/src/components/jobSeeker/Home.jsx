// pages/jobSeeker/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../../components/jobSeeker/Header';
import FilterModal from '../../components/jobSeeker/FilterModal';
import JobCard from '../../components/jobSeeker/JobCard';
import Pagination from '../../components/jobSeeker/Pagination';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 100000]);
  const [workingHours, setWorkingHours] = useState([0, 12]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [jobTitle, setCategories] = useState([]);
  const [jobseekerId, setEmployerId] = useState("");
  const [searchText, setSearchText] = useState("");

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
        const response = await axios.get('http://localhost:5000/api/jobs/all');
        console.log("Fetched jobs:", response.data);

        if (Array.isArray(response.data)) {
          setJobs(response.data);

          const uniqueLocations = [...new Set(response.data.map((job) => job.location))];
          const uniqueCategories = [...new Set(response.data.map((job) => job.category || "Other"))];
          setLocations(uniqueLocations);
          setCategories(uniqueCategories);
        } else {
          setJobs([]);
          setLocations([]);
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobs([]);
        setLocations([]);
        setCategories([]);
      }
    };

    fetchJobs();
  }, []);

  

  const filteredJobs = Array.isArray(jobs)
    ? jobs.filter((job) => {
        const jobSalary = job.payment ?? 0;
        const jobHours = job.duration ?? 0;

        const normalizedSearchText = (searchText || "").toUpperCase().trim();


        const normalizedJobLocation = job.location?.toUpperCase().trim() || "";
        const normalizedSelectedLocation = selectedLocation?.toUpperCase().trim() || "";
        const normalizedJobTitle = job.jobTitle?.toUpperCase().trim() || "";
        const normalizedSelectedCategory = selectedCategory?.toUpperCase().trim() || "";
        const normalizedCompany = job.company?.toUpperCase().trim() || "";

        return (
          (!selectedLocation || normalizedJobLocation === normalizedSelectedLocation) &&
          (!selectedCategory || normalizedJobTitle === normalizedSelectedCategory) &&
          jobSalary >= salaryRange[0] &&
          jobSalary <= salaryRange[1] &&
          jobHours >= workingHours[0] &&
          jobHours <= workingHours[1] &&
          (!searchText ||
            normalizedJobTitle.includes(normalizedSearchText) ||
            normalizedCompany.includes(normalizedSearchText) ||
            normalizedJobLocation.includes(normalizedSearchText) 
          )
        );
      })
    : [];


  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLocation, selectedCategory, salaryRange, workingHours]);

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        locations={locations}
        categories={jobTitle}
        onLocationChange={setSelectedLocation}
        onCategoryChange={setSelectedCategory}
        toggleFilterModal={() => setIsFilterOpen(true)}
        onSearchChange={setSearchText} 
      />


      <main className="max-w-5xl p-4 mx-auto text-justify sm:p-6 md:p-8">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {displayedJobs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No jobs found.</p>
          ) : (
            displayedJobs.map((job) => (
              <JobCard key={job._id} job={job} jobseekerId={jobseekerId} />
            ))
          )}
        </div>

        {(filteredJobs?.length ?? 0) > jobsPerPage && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        salaryRange={salaryRange}
        setSalaryRange={setSalaryRange}
        workingHours={workingHours}
        setWorkingHours={setWorkingHours}
        applyFilters={applyFilters}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Home;
