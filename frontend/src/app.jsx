import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Login from "./components/Login";
// import Home from "./components/Home";
import AddEmployerDetails from "./components/login/Employer";
import AddCompanyDetails from "./components/employer/CompanyDetails";
import AddJobPost from "./components/jobpost/CreateJobPost";

import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";

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
    path: "/employer",
    element: <AddEmployerDetails />,
  },
  {
    path: "/company-details",
    element: <AddCompanyDetails />,
  },
  {
    path: "/create-job",
    element: <AddJobPost/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
