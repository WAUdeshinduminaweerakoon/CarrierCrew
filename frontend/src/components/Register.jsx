import React, { useState } from "react";


const Register = () => {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      nic: "",
      address: "",
      role: "", // Assuming this is the select menu
      username: "",
      password: "",
      confirmPassword: "",
    });
  
    const [error, setError] = useState("");
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Simple validation
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("User registered successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            nic: "",
            address: "",
            role: "",
            username: "",
            password: "",
            confirmPassword: "",
          });
          setError("");
        } else {
          const resData = await response.json();
          setError(resData.message || "Something went wrong");
        }
      } catch (error) {
        setError("Failed to connect to the server");
      }
    };
  
    return (
      <div style={{ maxWidth: "500px", margin: "auto" }}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>
    );
  };
  
  export default Register;