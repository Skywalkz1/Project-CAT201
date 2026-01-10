import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Signup Data:', formData);
    // Add backend registration logic here
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create <span className="highlight">Account</span></h2>
          <p>Join HoodTech for exclusive deals and support</p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="input-group half-width">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="6+ characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group half-width">
              <label htmlFor="confirmPassword">Confirm</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="signin-link">Sign In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;