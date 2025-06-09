import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/admin-home";
import GeneralSettings from "./components/GeneralSettings";
import LoginPage from "./components/login/Login"; 
import AllJobs from "./components/ViewAllJobs";
import FileViewer from "./components/VIewCompanyApplications";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, 
  },
  {
    path: "/admin",
    element: <Home />, 
  },
  {
    path: "/settings",
    element: <GeneralSettings />,
  },
  {
    path: "/",
    element: <LoginPage />, 
  },
    {
    path: "/jobs",
    element: <AllJobs />, 
  },
      {
    path: "/company/authorization",
    element: <FileViewer />, 
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
