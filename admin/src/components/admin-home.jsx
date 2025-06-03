import React, { useEffect, useState } from "react";
import { BarChart3, Users, Briefcase, Settings, FileText, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import axios from 'axios';
import API_ROUTES from "../configs/config";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';


import moment from "moment";

const AdminDashboardHome = () => {
  const [employerCount, setEmployerCount] = useState(0);
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [userRegistrations, setUserRegistrations] = useState([]);


  // State to hold the job count by month data from API
  const [jobsByMonth, setJobsByMonth] = useState([]);

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

    const fetchJobsByMonth = async () => {
      try {
        const res = await axios.get(`${API_ROUTES.ADMIN_JOBS}/last-four-months`);
        // API returns something like:
        // [{ year: 2025, month: 3, count: 10 }, ...]
        
        // Format data for chart: label as "MMM YYYY", value as count
        const formattedData = res.data.map(({ year, month, count }) => ({
          name: moment().year(year).month(month - 1).format("MMM YYYY"),
          JobsPublished: count
        }));
        setJobsByMonth(formattedData);
      } catch (err) {
        console.error("Failed to fetch jobs by month:", err);
        setJobsByMonth([]);
      }
    };

    fetchCounts();
    fetchJobsByMonth();
  }, []);

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      try {
        const res = await axios.get(API_ROUTES.ADMIN_USERS+"/last-four-months");
        setUserRegistrations(res.data);
      } catch (err) {
        console.error("Failed to fetch user registration data:", err);
        setUserRegistrations([]);
      }
    };

    fetchUserRegistrations();
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
        <Link to="/jobs">
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <FileText className="w-6 h-6 text-indigo-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-700">Manage Job Posts</h2>
            </div>
            <p className="text-sm text-gray-600">View, approve, or remove job listings submitted by employers.</p>
          </div>
        </Link>

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

      {/* Charts Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Chart 1: Jobs Published */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-base font-semibold text-gray-700 mb-2">Jobs Published (Last 4 Months)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={jobsByMonth} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis allowDecimals={false} fontSize={10} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="JobsPublished" fill="#4ade80" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

                {/* Chart 3: Placeholder for additional chart */}
<div className="bg-white rounded-xl shadow p-4">
  <h3 className="text-base font-semibold text-gray-700 mb-2">Subscription Types</h3>
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie
        data={[
          { name: 'Free', value: 3 },
          { name: 'Basic', value: 10 },
          { name: 'Premium', value: 2 },
          { name: 'Ultimate', value: 1 },
        ]}
        cx="50%"
        cy="50%"
        outerRadius={70}
        fill="#8884d8"
        dataKey="value"
        label
      >
        <Cell fill="#34d399" /> {/* Green - Free */}
        <Cell fill="#60a5fa" /> {/* Blue - Basic */}
        <Cell fill="#fbbf24" /> {/* Amber - Premium */}
        <Cell fill="#f87171" /> {/* Red - Ultimate */}
      </Pie>
      <Tooltip />
      <Legend wrapperStyle={{ fontSize: 12 }} />
    </PieChart>
  </ResponsiveContainer>
</div>



        {/* Chart 2: User Registrations */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-base font-semibold text-gray-700 mb-2">User Registrations (Last 5 Months)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={userRegistrations} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis allowDecimals={false} fontSize={10} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Line type="monotone" dataKey="employers" stroke="#3b82f6" strokeWidth={2} name="Employers" />
              <Line type="monotone" dataKey="jobseekers" stroke="#ec4899" strokeWidth={2} name="Jobseekers" />
            </LineChart>
          </ResponsiveContainer>
        </div>


      </div>



    </div>

    
  );
};

export default AdminDashboardHome;
