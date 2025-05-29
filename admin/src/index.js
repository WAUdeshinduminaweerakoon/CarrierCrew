import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app.jsx';
//import AddCompanyDetails from './components/employer/CompanyDetails.jsx'; // Import your component
//import AddCompanyDetails from './components/employer/CompanyDetails.jsx';
//import AddEmployerDetails from './components/employer/Employer.jsx'; // Corrected file name and path

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <AddCompanyDetails />  */}
    {/* <AddEmployerDetails/>  */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

