// Register.jsx
import React, { useState, useEffect } from 'react';
import EmployerForm from './EmployerForm';
import JobSeekerForm from './JobSeekerForm';
import axios from 'axios';
import API_ROUTES from '../../../configs/config';
import {Link } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState('selection');
  const [userType, setUserType] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(`${API_ROUTES.LOCATIONS}/all`);
        setLocations(res.data);
      } catch (err) {
        console.error("Error fetching locations", err);
      }
    };
    fetchLocations();
  }, []);

  const handleSelection = (type) => {
    setUserType(type);
    setStep(type);
  };

  return (
  <div className="flex items-center justify-center min-h-screen pt-10 pb-10 bg-green-50">
    <div className="w-full max-w-md p-5 mx-auto font-sans bg-white border rounded-lg shadow-md">
      {step === 'selection' && (
        <>
          {/* HEADER: Arrow + Title in one row */}
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-2 shrink-0">
              <ArrowLeft className="text-green-600 cursor-pointer" strokeWidth={2.5} size={24} />
            </Link>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
              Unlock Part-Time Jobs. Join Us
            </h1>
          </div>

          {/* Subheading */}
          <p className="mb-6 text-center text-gray-600">I am a:</p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => handleSelection('JobSeeker')}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Job Seeker
            </button>
            <button
              onClick={() => handleSelection('Employer')}
              className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Employer
            </button>
          </div>
        </>
      )}

      {/* Forms */}
      {step === 'JobSeeker' && (
        <JobSeekerForm locations={locations} goBack={() => setStep('selection')} />
      )}
      {step === 'Employer' && (
        <EmployerForm locations={locations} goBack={() => setStep('selection')} />
      )}
    </div>
  </div>
); };

export default Register;

