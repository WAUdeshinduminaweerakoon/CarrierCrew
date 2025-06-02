import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ROUTES from '../../configs/config';

const EditEmployerProfiles = () => {
  const { employerId } = useParams();
  const navigate = useNavigate();

  const [employerForm, setEmployerForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    nearestCity: '',
  });

  const [companyForm, setCompanyForm] = useState({
    name: '',
    email: '',
    telephone: '',
    companyType: '',
    address: '',
    nearestCity: '',
    description: '',
    authorizedPerson: '',
    rating: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!employerId) {
      toast.error('No employer ID found');
      navigate('/employer/home');
      return;
    }

    const fetchEmployerData = async () => {
  try {
    const res = await axios.get(`${API_ROUTES.EMPLOYER}/${employerId}`);
    //console.log('API response:', res.data);
    const emp = res.data.data.employer;
    const company = res.data.data.company;


    //const emp = res.data.data || res.data;
    console.log('emp.company:', emp.company);

    setEmployerForm({
      firstName: emp.firstName || '',
      lastName: emp.lastName || '',
      email: emp.email || '',
      mobileNumber: emp.mobileNumber || '',
      address: emp.address || '',
      nearestCity: emp.nearestCity || '',
    });

    setCompanyForm({
      name: emp.company?.name || '',
      email: emp.company?.email || '',
      telephone: emp.company?.telephone || '',
      companyType: emp.company?.companyType || '',
      address: emp.company?.address || '',
      nearestCity: emp.company?.nearestCity || '',
      description: emp.company?.description || '',
      authorizedPerson: emp.company?.authorizedPerson || '',
      rating: emp.company?.rating || 0,
    });

  } catch (error) {
    console.error('Error fetching employer data:', error);
    toast.error('Failed to load employer data');
  } finally {
    setLoading(false);
  }
};


    fetchEmployerData();
  }, [employerId, navigate]);

  const handleEmployerChange = (e) => {
    const { name, value } = e.target;
    setEmployerForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!employerForm.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!employerForm.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!employerForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email address.';
    if (!employerForm.mobileNumber.match(/^\d{10}$/)) newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
    if (!employerForm.address.trim()) newErrors.address = 'Address is required.';
    if (!employerForm.nearestCity.trim()) newErrors.nearestCity = 'Nearest city is required.';

    if (!companyForm.name.trim()) newErrors.name = 'Company name is required.';
    if (!companyForm.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid company email address.';
    if (!companyForm.telephone.match(/^\d{10}$/)) newErrors.telephone = 'Enter a valid 10-digit telephone number.';
    if (!companyForm.companyType.trim()) newErrors.companyType = 'Company type is required.';
    if (!companyForm.address.trim()) newErrors.address = 'Company address is required.';
    if (!companyForm.nearestCity.trim()) newErrors.nearestCity = 'Company nearest city is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const updatePayload = {
        ...employerForm,
        company: companyForm,
      };

      await axios.put(`${API_ROUTES.EMPLOYER}/${employerId}`, updatePayload);
      toast.success('Profile updated successfully');
      navigate('/employer/profile');
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <p className="mt-8 text-center">Loading...</p>;

  return (
    <div className="max-w-lg p-6 mx-auto bg-white rounded shadow">
      <ToastContainer />
      <h2 className="mb-4 text-xl font-bold text-green-600">Edit Employer Profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <h3 className="font-semibold">Personal Info</h3>
        {['firstName', 'lastName', 'email', 'mobileNumber', 'address', 'nearestCity'].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              value={employerForm[field]}
              onChange={handleEmployerChange}
              placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              className={`p-2 border rounded w-full ${
                errors[field] ? 'border-red-500' : 'border-green-400'
              }`}
            />
            {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
          </div>
        ))}

        <h3 className="mt-6 font-semibold">Company Info</h3>
        {[
          { name: 'name', label: 'Company Name' },
          { name: 'email', label: 'Company Email' },
          { name: 'telephone', label: 'Telephone' },
          { name: 'companyType', label: 'Company Type' },
          { name: 'address', label: 'Company Address' },
          { name: 'nearestCity', label: 'Company Nearest City' },
          { name: 'description', label: 'Description' },
          { name: 'authorizedPerson', label: 'Authorized Person' },
          { name: 'rating', label: 'Rating', type: 'number' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <input
              type={type}
              name={name}
              value={companyForm[name]}
              onChange={handleCompanyChange}
              placeholder={label}
              className={`p-2 border rounded w-full ${
                errors[name] ? 'border-red-500' : 'border-green-400'
              }`}
              min={name === 'rating' ? 0 : undefined}
              max={name === 'rating' ? 5 : undefined}
            />
            {errors[name] && <p className="mt-1 text-sm text-red-500">{errors[name]}</p>}
          </div>
          
        ))}

        <button
          type="submit"
          className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditEmployerProfiles;
