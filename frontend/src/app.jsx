import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/jobSeeker/Home";
import EmployerHome from "./components/employer/Home";

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
    path: "/employer/home",
    element: <EmployerHome />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;