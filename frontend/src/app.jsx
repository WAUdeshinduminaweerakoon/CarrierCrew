import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import PasswordReset from "./components/PasswordReset";
import OtpSend from "./components/OtpSend";


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
    path: "/passwordreset",
    element: <PasswordReset />,
  },
  {
    path: "/otpverify",
    element: <OtpSend />,
  }

]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;