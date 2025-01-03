import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    nic: '',
    address: '',
    city: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend via API call
    fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 style={{ color: "blue", fontSize: "25px" }}>Unlock Part-Time Jobs <br></br> Join Us!</h2>
        

        {/*<label htmlFor="role">Role:</label>*/}
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="Admin">Job Seeker</option>
          <option value="User">Employee</option>
        </select>

        {/*<label htmlFor="firstName">First Name:</label>*/}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />

        {/*<label htmlFor="lastName">Last Name:</label>*/}
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder='Last Name'
          required
        />

        {/*<label htmlFor="email">Email:</label>*/}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />

        {/*<label htmlFor="mobile">Mobile Number:</label>*/}
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder='Mobile Number'
          required
        />

       {/* <label htmlFor="nic">NIC:</label>*/}
        <input
          type="text"
          name="nic"
          value={formData.nic}
          onChange={handleChange}
          placeholder='NIC'
          required
        />

        {/*<label htmlFor="address">Address:</label>*/}
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder='Address'
          required
        ></textarea>

        {/*<label htmlFor="city">Nearest City:</label>*/}
        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">Nearest City</option>
          <option value="City1">City1</option>
          <option value="City2">City2</option>
          <option value="City3">City3</option>
        </select>

        {/*<label htmlFor="username">Username:</label>*/}
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder='Username'
          required
        />

        {/*<label htmlFor="password">Password:</label>*/}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />

       {/*} <label htmlFor="confirmPassword">Confirm Password:</label>*/}
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder='Confirm Password'
          required
        />

        {/*<label>Gender:</label>*/}
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Register;
