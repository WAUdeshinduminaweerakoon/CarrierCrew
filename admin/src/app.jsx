//import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css"; // Tailwind CSS

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./components/admin-home";
import GeneralSettings from "./components/GeneralSettings";

// Create router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
    {
    path: "/settings",
    element: <GeneralSettings />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;