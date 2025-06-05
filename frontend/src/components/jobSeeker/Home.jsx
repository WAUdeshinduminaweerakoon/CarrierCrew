import React, { useState, useEffect } from 'react';
import Header from '../../components/jobSeeker/Header';
import FilterModal from '../../components/jobSeeker/FilterModal';
import JobCard from '../../components/jobSeeker/JobCard';
import Pagination from '../../components/jobSeeker/Pagination';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import API_ROUTES from '../../configs/config';

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
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [jobTitle, setCategories] = useState([]);
  const [jobseekerId, setEmployerId] = useState("");
  const [searchText, setSearchText] = useState("");

  const apiURL = `${API_ROUTES.JOBS}/all`;

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
      const response = await axios.get(apiURL);
      console.log("Fetched jobs:", response.data);

      if (Array.isArray(response.data)) {
        const sortedJobs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobs(sortedJobs);

        const uniqueLocations = [...new Set(sortedJobs.map((job) => job.location))];
        const uniqueCategories = [...new Set(sortedJobs.map((job) => job.category || "Other"))];
        const uniqueDistricts = [...new Set(sortedJobs.map((job) => job.district || "Other"))];

        setLocations(uniqueLocations);
        setCategories(uniqueCategories);
        setDistricts(uniqueDistricts);
      } else {
        setJobs([]);
        setLocations([]);
        setCategories([]);
        setDistricts([]);
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
        const normalizedJobDistrict = job.district?.toUpperCase().trim() || "";
        const normalizedSelectedDistrict = selectedDistrict?.toUpperCase().trim() || "";


        const normalizedJobLocation = job.location?.toUpperCase().trim() || "";
        const normalizedSelectedLocation = selectedLocation?.toUpperCase().trim() || "";
        const normalizedJobTitle = job.jobTitle?.toUpperCase().trim() || "";
        const normalizedSelectedCategory = selectedCategory?.toUpperCase().trim() || "";
        const normalizedCompany = job.company?.toUpperCase().trim() || "";

        return (
          (!selectedLocation || normalizedJobLocation === normalizedSelectedLocation) &&
          (!selectedCategory || normalizedJobTitle === normalizedSelectedCategory) &&
          (!selectedDistrict || normalizedJobDistrict === normalizedSelectedDistrict) &&
          jobSalary >= salaryRange[0] &&
          jobSalary <= salaryRange[1] &&
          jobHours >= workingHours[0] &&
          jobHours <= workingHours[1] &&
          (!searchText ||
            normalizedJobTitle.includes(normalizedSearchText) ||
            normalizedCompany.includes(normalizedSearchText) ||
            normalizedJobLocation.includes(normalizedSearchText)||
            normalizedJobDistrict.includes(normalizedSearchText)
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
  }, [selectedLocation, selectedCategory,selectedDistrict, salaryRange, workingHours]);

  const applyFilters = () => {
    setIsFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        selectedDistrict={selectedDistrict}
        locations={locations}
        districts={districts}
        categories={jobTitle}
        onLocationChange={setSelectedLocation}
        onDistrictChange={setSelectedDistrict}
        onCategoryChange={setSelectedCategory}
        toggleFilterModal={() => setIsFilterOpen(true)}
        onSearchChange={setSearchText} 
      />


      <main className="justify-center max-w-5xl p-4 mx-auto text-center sm:p-6 md:p-8">
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
          <div className="flex justify-center mt-8">
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
