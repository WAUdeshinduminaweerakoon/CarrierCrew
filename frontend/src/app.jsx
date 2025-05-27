import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/login/Register";
import AddCompanyDetails from "./components/employer/CompanyDetails";
import AddJobPost from "./components/employer/CreateJobPost";
// import AddJobPost from "./components/jobpost/CreateJobPost";
import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";
import EmployerProfile from "./components/employer/EmployerProfile";
import EmployerHome from "./components/employer/Home";
import JobSeekerProfile from "./components/jobSeeker/JobSeekerProfile";
import CompanyProfile from "./components/company/CompanyProfile"
import ForgotPassword from "./components/password/ForgotPassword"

// import Login from "./components/Login";
// import Home from "./components/Home";
import AddEmployerDetails from "./components/employer/Employer";


// Create router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobseeker/home",
    element: <Home />,
  },
  {
    path:"/jobseeker/profile",
    element: <JobSeekerProfile/>
  },
  {
    path: "/employer/home",
    element: <EmployerHome />,
  },
  {
    path: "/company-details",
    element: <AddCompanyDetails />,
  },
  {
    path: "/employer/create-job",
    element: <AddJobPost/>
  },
  {
    path: "/employer-profile",
    element: <EmployerProfile/>
  },
  {
    path: "/company-profile",
    element: <CompanyProfile/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
