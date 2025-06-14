import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import API_ROUTES from '../../configs/config';

export default function EditCompanyProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const employerId = location.state?.employerId || localStorage.getItem('userId');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyData, setCompanyData] = useState({
    name: '',
    email: '',
    description: '',
    telephone: '',
    address: '',
    nearestCity: '',
    //rating: 0,
    //authorizedPerson: '',
  });

  useEffect(() => {
    if (!employerId) {
      setError('Employer ID not found.');
      setLoading(false);
      return;
    }

    fetch(`${API_ROUTES.EMPLOYER}/${employerId}`)
      .then((res) =>{
        if (!res.ok) throw new Error('Failed to fetch Company');
        return res.json()
       })
      .then((data) => {
        setCompanyData({
          name: data.name || '',
          email: data.email || '',
          description: data.company?.description || '',
          telephone: data.company?.telephone || '',
          address: data.company?.address || '',
          nearestCity: data.company?.nearestCity || '',
          //rating: data.company?.rating || 0,
          //authorizedPerson: data.company?.authorizedPerson || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load company data');
        setLoading(false);
      });
  }, [employerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_ROUTES.EMPLOYER}/${employerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company: companyData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(() => {
        toast.success('Company profile updated successfully!');
        setTimeout(()=> {navigate('/employer/companyprofile', { state: { employerId } });},1500);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error updating company profile');
      });
  };

  if (loading) return <p className="mt-8 text-center">Loading...</p>;
  if (error) return <p className="mt-8 text-center text-red-500">{error}</p>;

  return (
    <div>
      <Header/>
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">Edit Company Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={companyData.email}
            onChange={handleChange}
            placeholder="Company Email"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            value={companyData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="telephone"
            value={companyData.telephone}
            onChange={handleChange}
            placeholder="Telephone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={companyData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="nearestCity"
            value={companyData.nearestCity}
            onChange={handleChange}
            placeholder="Nearest City"
            className="w-full p-2 border rounded"
          />
        

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}
