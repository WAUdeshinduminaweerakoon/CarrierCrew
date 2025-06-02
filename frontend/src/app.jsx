import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/login/Register";
import AddCompanyDetails from "./components/employer/CompanyDetails";
import AddJobPost from "./components/employer/CreateJobPost";
import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";
import EmployerProfile from "./components/employer/EmployerProfile";
import EmployerHome from "./components/employer/EmployerHome";
import JobSeekerProfile from "./components/jobSeeker/JobSeekerProfile";
import CompanyProfile from "./components/employer/CompanyProfile";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/login/OtpVerfication";
import Applications from "./components/employer/ViewApplications"
import DeleteAccount from "./components/Account/DeleteAccountConfirm";
import MyPosts from "./components/employer/MyPosts";
import EditEmployerProfiles from "./components/employer/EditEmployerProfiles";
import EditCompanyProfile from "./components/employer/EditCompanyProfile";


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
    path: "/employer/profile",
    element: <EmployerProfile/>
  },
  {
    path: "/employer/companyprofile",
    element: <CompanyProfile/>
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword/>
  },
    {
    path: "/verify",
    element: <VerifyOtp/>
  },
    {
    path: "/employer/view-applications",
    element: <Applications/>
  },
  {
    path: "/deleteaccount",
    element: <DeleteAccount/>
  },
    {
    path: "/employer/my-posts",
    element: <MyPosts/>
  },
  {
    path: "/employer/edit-profile/:employerId",
    element: <EditEmployerProfiles/>
  },
  {
    path: "/employer/edit-companyprofile/:employerId",
    element: <EditCompanyProfile/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

