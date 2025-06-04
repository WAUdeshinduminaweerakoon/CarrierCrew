// Register.jsx
import React, { useState, useEffect } from 'react';
import EmployerForm from './EmployerForm';
import JobSeekerForm from './JobSeekerForm';
import axios from 'axios';
import API_ROUTES from '../../../configs/config';

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
            <h1 className="mb-6 text-2xl font-bold text-center text-green-600">
              Unlock Part-Time Jobs. Join Us
            </h1>
            <p className="mb-6 text-center text-gray-600">I am a:</p>
            <div className="flex justify-center gap-4">
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

        {step === 'JobSeeker' && (
          <JobSeekerForm locations={locations} goBack={() => setStep('selection')} />
        )}

        {step === 'Employer' && (
          <EmployerForm locations={locations} goBack={() => setStep('selection')} />
        )}
      </div>
    </div>
  );
};

export default Register;

