import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import API_ROUTES from "../configs/config";
import JobFilterSidebar from "../components/JobFilterSidebar";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contactVisibleIndex, setContactVisibleIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [salaryRange, setSalaryRange] = useState([0, 10000]);
  const [workingHours, setWorkingHours] = useState([0, 12]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [vacancies, setVacancies] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");


   

  const applyFilters = () => {
  setIsFilterModalOpen(false); 
  };


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(API_ROUTES.ADMIN_JOBS + "/all");
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  };


 

  const filteredJobs = jobs.filter((job) => {
    const search = searchTerm.toLowerCase();
    const fullName = `${job.employer.firstName} ${job.employer.lastName}`.toLowerCase();

    const matchesSearch =
      job.jobId.toString().toLowerCase().includes(search) ||
      job.jobTitle.toLowerCase().includes(search) ||
      job.location.toLowerCase().includes(search) ||
      job.employer.firstName.toLowerCase().includes(search) ||
      job.employer.lastName.toLowerCase().includes(search) ||
      fullName.includes(search) ||
      (job.employer.company?.name?.toLowerCase().includes(search) || false);

    const matchesDistrict = selectedDistrict
      ? job.district?.toLowerCase() === selectedDistrict.toLowerCase()
      : true;

    const matchesArea = selectedArea 
      ? job.location?.toLowerCase() === selectedArea.toLowerCase()
      : true;

    const matchesCategory = selectedCategory
    ? job.jobTitle?.toLowerCase() === selectedCategory.toLowerCase()
    : true;

    const matchesVacancies = vacancies
    ? job.vacancies >= parseInt(vacancies)
    : true;
    
    const createdAt = new Date(job.createdAt);
    const matchesDate = (!dateFrom || createdAt >= new Date(dateFrom)) &&
                      (!dateTo || createdAt <= new Date(dateTo));


    const matchesSalary = job.payment >= salaryRange[0] && job.payment <= salaryRange[1];

    const jobHours = job.duration; // approx
    const matchesWorkingHours = jobHours >= workingHours[0] && jobHours <= workingHours[1];

  return matchesSearch && matchesDistrict && matchesArea && matchesCategory && matchesVacancies && matchesDate && matchesSalary && matchesWorkingHours;
  });

  const handleDelete = async () => {
    if (!jobToDelete) return;
    try {
      const res = await fetch(`${API_ROUTES.ADMIN_JOBS}/${jobToDelete}/delete`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((job) => job.jobId !== jobToDelete));
        alert("Job post deleted successfully.");
      } else {
        alert("Failed to delete job.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting job.");
    } finally {
      setShowConfirm(false);
      setJobToDelete(null);
      setExpandedIndex(null);
      setContactVisibleIndex(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800">CareerCrew.LK</h1>
        </div>
        <button
          className="flex items-center text-gray-600 hover:text-blue-600"
          onClick={() => (window.location.href = "/admin")}
        >
          <HomeIcon className="w-5 h-5 mr-1" /> Home
        </button>
      </header>

      <div className="flex flex-grow">
        <JobFilterSidebar
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDistrictChange={setSelectedDistrict}
          onAreaChange={setSelectedArea}
          selectedCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          workingHours={workingHours}
          setWorkingHours={setWorkingHours}
          applyFilters={applyFilters}
          vacancies={vacancies}
          setVacancies={setVacancies}
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />

        <main className="flex-grow p-8 bg-gray-100">
          <h2 className="mb-6 text-2xl font-bold">Job Listings</h2>
          {filteredJobs.length === 0 ? (
            <p className="text-gray-600">No job posts found.</p>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => {
                const isExpanded = expandedIndex === index;
                const isContactVisible = contactVisibleIndex === index;

                return (
                  <div
                    key={job.jobId}
                    className="p-6 bg-white rounded shadow cursor-pointer"
                    onClick={() =>
                      setExpandedIndex((prev) => (prev === index ? null : index))
                    }
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {job.jobTitle}{" "}
                          <span className="text-sm text-gray-600">
                            ({job.location})
                          </span>
                        </h3>
                        <p className="text-sm text-gray-500">
                          Published by {job.employer.firstName} {job.employer.lastName}
                        </p>
                        {job.employer.company && (
                          <p className="text-sm text-gray-600">
                            {job.employer.company.name}
                          </p>
                        )}
                      </div>

                      <div className="text-sm text-right text-gray-700">
                        <p><span className="font-semibold">Job ID:</span> {job.jobId}</p>
                        <p><span className="font-semibold">Vacancies:</span> {job.vacancies}</p>
                        <p>
                          <span className="font-semibold">Created on</span>{" "}
                          {new Date(job.createdAt).toLocaleDateString()}{" "}
                          <span className="font-semibold">at</span>{" "}
                          {new Date(job.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="mt-4">
                        <p className="text-gray-600">
                          Date: {new Date(job.dateFrom).toLocaleDateString()} -{" "}
                          {new Date(job.dateTo).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">Time: {job.timeFrom} - {job.timeTo}</p>
                        <p className="text-gray-600">Duration: {job.duration} day(s)</p>
                        <p className="text-gray-600">Payment: Rs. {job.payment}</p>
                        <p className="text-gray-600">Job Description:</p>
                        <p>{job.description}</p>
                        <p className="text-gray-600">No. of Applicants: {job.numberOfApplicants}</p>

                        <div className="mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContactVisibleIndex((prev) => prev === index ? null : index);
                            }}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                          >
                            Contact Details
                          </button>

                          {isContactVisible && (
                            <div className="flex justify-between p-4 mt-4 bg-gray-100 rounded">
                              <div>
                                <h4 className="font-bold text-gray-700">
                                  {job.employer.firstName} {job.employer.lastName}
                                </h4>
                                <p className="text-gray-600">{job.employer.email}</p>
                                <p className="text-gray-600">{job.employer.mobileNumber}</p>
                              </div>
                              {job.employer.company && (
                                <div className="text-right">
                                  <h4 className="font-bold text-gray-700">
                                    {job.employer.company.name}
                                  </h4>
                                  <p className="text-gray-600">{job.employer.company.email}</p>
                                  <p className="text-gray-600">{job.employer.company.telephone}</p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex justify-end mt-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setJobToDelete(job.jobId);
                                setShowConfirm(true);
                              }}
                              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              Discard
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md p-6 bg-white rounded shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Are you sure you want to delete this job post?
            </h3>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowConfirm(false);
                  setJobToDelete(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewJobs;
