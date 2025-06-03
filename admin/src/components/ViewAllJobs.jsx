import { useEffect, useState } from "react";
import { HomeIcon } from "lucide-react";
import API_ROUTES from "../configs/config";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [contactVisibleIndex, setContactVisibleIndex] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-8" />
          <h1 className="text-2xl font-bold text-gray-800">CareerCrew.LK</h1>
        </div>
        <button
          className="text-gray-600 hover:text-blue-600 flex items-center"
          onClick={() => (window.location.href = "/admin")}
        >
          <HomeIcon className="h-5 w-5 mr-1" /> Home
        </button>
      </header>

      <div className="flex flex-grow">
        <aside className="w-64 bg-white shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Filters</h2>
          <p className="text-sm text-gray-500">Filter options coming soon...</p>
        </aside>

        <main className="flex-grow p-8 bg-gray-100">
          <h2 className="text-2xl font-bold mb-6">Job Listings</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600">No job posts available.</p>
          ) : (
            <div className="space-y-6">
              {jobs.map((job, index) => {
                const isExpanded = expandedIndex === index;
                const isContactVisible = contactVisibleIndex === index;

                return (
                  <div
                    key={index}
                    className="bg-white p-6 rounded shadow cursor-pointer"
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
                          Published by {job.employer.firstName}{" "}
                          {job.employer.lastName}
                        </p>
                        {job.employer.company && (
                          <p className="text-sm text-gray-600">
                            {job.employer.company.name}
                          </p>
                        )}
                      </div>

                      <div className="text-right text-sm text-gray-700">
                        <p>
                          <span className="font-semibold">Job ID:</span>{" "}
                          {job.jobId}
                        </p>
                        <p>
                          <span className="font-semibold">Vacancies:</span>{" "}
                          {job.vacancies}
                        </p>
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
                          Date:{" "}
                          {new Date(job.dateFrom).toLocaleDateString()} -{" "}
                          {new Date(job.dateTo).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">
                          Time: {job.timeFrom} - {job.timeTo}
                        </p>
                        <p className="text-gray-600">
                          Duration: {job.duration} day(s)
                        </p>
                        <p className="text-gray-600">
                          Payment: Rs. {job.payment}
                        </p>
                        <p className="text-gray-600">Job Description:</p>
                        <p>{job.description}</p>
                        <p className="text-gray-600">
                          No. of Applicants: {job.numberOfApplicants}
                        </p>

                        <div className="mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setContactVisibleIndex((prev) =>
                                prev === index ? null : index
                              );
                            }}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Contact Details
                          </button>

                          {isContactVisible && (
                            <div className="flex justify-between mt-4 bg-gray-100 p-4 rounded">
                              <div>
                                <h4 className="font-bold text-gray-700">
                                  {job.employer.firstName}{" "}
                                  {job.employer.lastName}
                                </h4>
                                <p className="text-gray-600">
                                  {job.employer.email}
                                </p>
                                <p className="text-gray-600">
                                  {job.employer.mobileNumber}
                                </p>
                              </div>
                              {job.employer.company && (
                                <div className="text-right">
                                  <h4 className="font-bold text-gray-700">
                                    {job.employer.company.name}
                                  </h4>
                                  <p className="text-gray-600">
                                    {job.employer.company.email}
                                  </p>
                                  <p className="text-gray-600">
                                    {job.employer.company.telephone}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setJobToDelete(job.jobId);
                                console.log("Setting job to delete:", job.jobId);
                                setShowConfirm(true);
                              }}
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
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
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={async () => {
                  if (!jobToDelete) {
                    console.error("No job selected to delete");
                    return;
                  }

                  try {
                    const res = await fetch(`${API_ROUTES.ADMIN_JOBS}/${jobToDelete}/delete`, {
                      method: "DELETE",
                    });

                    if (res.ok) {
                      setJobs((prev) => prev.filter((job) => job.jobId !== jobToDelete));
                      alert("Job post has been deleted successfully.");
                    } else {
                      console.error("Failed to delete job");
                    }
                  } catch (err) {
                    console.error("Error deleting job", err);
                  } finally {
                    setShowConfirm(false);
                    setJobToDelete(null);
                    setExpandedIndex(null);
                    setContactVisibleIndex(null);
                  }
                }}
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