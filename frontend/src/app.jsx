import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Home from "./components/Home";
import Register from "./components/login/Register";
import AddCompanyDetails from "./components/employer/CompanyDetails";
import AddJobPost from "./components/jobpost/CreateJobPost";

import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";
import EmployerHome from "./components/employer/Home";
import JobSeekerProfile from "./components/jobSeeker/JobSeekerProfile";

// Create router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
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
    path: "/create-job",
    element: <AddJobPost/>
  },
  {
    path:"/jobseeker/profile",
    element: <JobSeekerProfile/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
