import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCompanyDetails = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    telephone: "",
    companyType: "",
    address: "",
    nearestCity: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (form.name.trim() === "") {
      newErrors.name = "Name is required.";
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!phoneRegex.test(form.telephone)) {
      newErrors.telephone = "Telephone number must be 10 digits.";
    }

    if (form.companyType.trim() === "") {
      newErrors.companyType = "Company Type is required.";
    }

    if (form.address.trim() === "") {
      newErrors.address = "Address is required.";
    }

    if (form.nearestCity.trim() === "") {
      newErrors.nearestCity = "Nearest City is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/Employer");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  return (
    <div className="mim-h-screen flex items-center justify-center bg-gray-100 pt-10 pb-10">
      <div className="max-w-md mx-auto p-5 border rounded-lg text-center font-sans bg-white shadow-md">
        <h1 className="text-lg font-bold text-blue-500 mb-5">Add Company Details (Optional)</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.name ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 text-left mt-1">{errors.name}</p>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.email ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 text-left mt-1">{errors.email}</p>}

          <input
            type="text"
            name="telephone"
            placeholder="Telephone Number"
            value={form.telephone}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.telephone ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.telephone && <p className="text-xs text-red-500 text-left mt-1">{errors.telephone}</p>}

          <input
            type="text"
            name="companyType"
            placeholder="Company Type"
            value={form.companyType}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.companyType ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.companyType && <p className="text-xs text-red-500 text-left mt-1">{errors.companyType}</p>}

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.address ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.address && <p className="text-xs text-red-500 text-left mt-1">{errors.address}</p>}

          <input
            type="text"
            name="nearestCity"
            placeholder="Nearest City"
            value={form.nearestCity}
            onChange={handleChange}
            className={`p-2 text-sm border rounded-md ${
              errors.nearestCity ? "border-red-500" : "border-blue-500"
            }`}
          />
          {errors.nearestCity && <p className="text-xs text-red-500 text-left mt-1">{errors.nearestCity}</p>}

          <label htmlFor="upload" className="text-sm text-blue-500 cursor-pointer text-left">
            Upload Authorization Letter
            <input
              type="file"
              id="upload"
              className="p-2 text-sm border border-blue-500 rounded-md"
            />
          </label>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              className="px-7 py-2 text-sm bg-blue-200 text-blue-600 rounded-md"
              onClick={() => navigate("/register")}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-7 py-2 text-sm bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm bg-gray-600 text-white rounded-md"
              onClick={() => navigate("/Employer")}
            >
              Proceed Without Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyDetails;
