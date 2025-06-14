import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Register from "./components/login/Register/Register";
import AddCompanyDetails from "./components/employer/CompanyDetails";
import AddJobPost from "./components/employer/CreateJobPost";
import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";
import EmployerProfile from "./components/employer/EmployerProfile";
import EmployerHome from "./components/employer/EmployerHome";
import JobSeekerProfile from "./components/jobSeeker/JobSeekerProfile";
import CompanyProfile from "./components/employer/CompanyProfile";
import ResetPassword from "./components/login/ResetPassword";
//import VerifyOtp from "./components/login/OtpVerfication";
import VerifyOtp from "./components/login/VerifyOtp";
import Applications from "./components/employer/ViewApplications"
import DeleteAccount from "./components/Account/DeleteAccountConfirm";
import MyPosts from "./components/employer/MyPosts";
import EditEmployerProfiles from "./components/employer/EditEmployerProfiles";
import EditCompanyProfile from "./components/employer/EditCompanyProfile";
import ManageProfile from "./components/Account/ManageProfile";
import EditJobSeekerProfile from "./components/jobSeeker/EditJobSeekerProfile";
import SubscriptionPlans from "./components/employer/SubscriptionPlans/SubscriptionPlans";
import PaymentForm from "./components/employer/SubscriptionPlans/PaymentPage";
import PlanCard from "./components/employer/SubscriptionPlans/PlanCard";
import JobSeekerRegistrationFrom from "./components/login/Register/JobSeekerForm"
import EmployerRegistrationFrom from "./components/login/Register/EmployerForm"
import EmployerChat from "./components/Chat/EmployerChat"
import EditJobForm from "./components/employer/EditMyPosts";
//import PaymentSuccess from "./components/employer/SubscriptionPlans/PaymentSuccess";
//import PaymentFailure from "./components/employer/SubscriptionPlans/PaymentFailure";
import ForgotPasswordPage1 from "./components/login/ForgotPasswordPage1";
import EmployerSettings from "./components/employer/EmployerSettings";
import JobSeekerSettings from "./components/jobSeeker/JobSeekerSettings";

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
    path:"/register/jobseeker",
    element: <JobSeekerRegistrationFrom/>
  },
  {
    path:"/register/employer",
    element: <EmployerRegistrationFrom/>
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
    path: "/reset-password",
    element: <ResetPassword/>
  },
  {
    path: "/verify-otp",
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
  {
    path: "/manageprofile",
    element: <ManageProfile/>
  },
  {
    path:"/jobseeker/edit-profile/:jobSeekerId",
    element: <EditJobSeekerProfile/>
  },
  {
    path:"/employer/subs-plans",
    element: <SubscriptionPlans/>
  },
  {
    path:"/plans/pay",
    element: <PaymentForm/>
  },
  {
    path:"/plan/:planName",
    element: <PlanCard/>
  },
   {
    path:"/chat",
    element: <EmployerChat/>
  },
  {
    path:"/employer/edit-post/:jobId",
    element: <EditJobForm/>
  },
  {
    path:"/forgot-password/step1",
    element: <ForgotPasswordPage1/>
  },
  /*
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-failure",
    element: <PaymentFailure />,
  },*/
  {
    path:"/employer/settings",
    element: <EmployerSettings/>
  },
  {
    path:"/jobseeker/settings",
    element: <JobSeekerSettings/>
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

