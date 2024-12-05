import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import AddEmployerDetails from "./components/employer/Employer";
import AddCompanyDetails from "./components/employer/CompanyDetails";


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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
