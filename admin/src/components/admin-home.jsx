import React, { useEffect, useState } from "react";
import { BarChart3, Users, Briefcase, Settings, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import API_ROUTES from "../configs/config";

const AdminDashboardHome = () => {
  const [employerCount, setEmployerCount] = useState(0);
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [employerRes, jobSeekerRes, jobRes, applicantRes] = await Promise.all([
          axios.get(`${API_ROUTES.ADMIN_EMPLOYERS}/count`),
          axios.get(`${API_ROUTES.ADMIN_JOBSEEKERS}/count`),
          axios.get(`${API_ROUTES.ADMIN_JOBS}/count`),
          axios.get(`${API_ROUTES.ADMIN_APPLICANTS}/count`)
        ]);

        setEmployerCount(employerRes.data.totalEmployers || 0);
        setJobSeekerCount(jobSeekerRes.data.totalJobSeekers || 0);
        setJobCount(jobRes.data.totalJobs || 0);
        setApplicantCount(applicantRes.data.totalApplicants || 0);

      } catch (err) {
        console.error("Failed to fetch counts:", err);
        setEmployerCount(0);
        setJobSeekerCount(0);
        setJobCount(0);
        setApplicantCount(0);
      }
    };

    fetchCounts();
  }, []);

  const totalUsers = employerCount + jobSeekerCount;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">CareerCrew.LK</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[{
          title: "Total Users",
          value: totalUsers.toLocaleString(),
          icon: <Users className="w-10 h-10 text-blue-500" />
        }, {
          title: "Job Listings",
          value: jobCount.toLocaleString(),
          icon: <Briefcase className="w-10 h-10 text-green-500" />
        }, {
          title: "Applications",
          value: applicantCount.toLocaleString(),
          icon: <BarChart3 className="w-10 h-10 text-purple-500" />
        }].map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              {item.icon}
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-xl font-semibold">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <FileText className="w-6 h-6 text-indigo-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-700">Manage Job Posts</h2>
          </div>
          <p className="text-sm text-gray-600">View, approve, or remove job listings submitted by employers.</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-700">Review Applications</h2>
          </div>
          <p className="text-sm text-gray-600">Moderate and monitor job seeker applications and activity.</p>
        </div>

        <Link to="/settings">
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 text-rose-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-700">General Settings</h2>
            </div>
            <p className="text-sm text-gray-600">Manage general settings, admin accounts, roles, and permissions.</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
        <ul className="space-y-3 text-sm text-gray-600">
          <li>✅ User <strong>john_doe</strong> registered.</li>
          <li>📝 Employer <strong>ABC Pvt Ltd</strong> posted a new job.</li>
          <li>📥 New application received for <strong>Marketing Intern</strong>.</li>
          <li>🗑️ Job post <strong>Cashier</strong> was removed.</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
