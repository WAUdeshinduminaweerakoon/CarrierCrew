import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";

export default function EditEmployerProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const employerId = location.state?.employerId || localStorage.getItem("userId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    nearestCity: '',
    district: '', 
    email:'',
    description:'',
  });

  useEffect(() => {
    if (!employerId) {
      setError('No employer ID found. Please log in.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/employers/${employerId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch employer');
        return res.json();
      })
      .then((data) => {
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          mobileNumber: data.mobileNumber || '',
          email: data.email || '',
          address: data.address || '',
          nearestCity: data.nearestCity || '',
          district: data.district || '', 
          description: data.description || '',
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load employer data');
        setLoading(false);
      });
  }, [employerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('company.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        company: {
          ...prev.company,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/employers/${employerId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then((updated) => {
        toast.success('Profile updated successfully!');
        setTimeout( ()=> {navigate(`/employer/profile`, { state: { employerId: updated._id } });},1500);//1.5second delay to show popup
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error updating profile');
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
        <h2 className="mb-4 text-2xl font-bold text-center text-green-600">Edit Employer Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          <h3 className="mt-4 font-semibold">First Name</h3>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your First Name"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">Last Name</h3>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your Last Name"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">Mobile No.</h3>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter your Mobile Number"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">Address</h3>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your Address"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">Nearest City</h3>
          <input
            type="text"
            name="nearestCity"
            value={formData.nearestCity}
            onChange={handleChange}
            placeholder="Enter your Nearest City"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">District</h3>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter your District"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">Email Address</h3>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email Address"
            className="w-full p-2 border rounded"
          />

          <h3 className="mt-4 font-semibold">About</h3>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly explain about you"
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