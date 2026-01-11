import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate(); // Hook for redirection

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI States
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      // 2. Send Data to Backend
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      // 3. Handle Response
      if (response.ok) {
        alert("Account created successfully! Please sign in.");
        navigate('/login'); // Redirect to Login page
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Registration failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setErrorMessage("Server is not responding. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create <span className="highlight">Account</span></h2>
          <p>Join HoodTech for exclusive deals and support</p>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
            {errorMessage}
          </div>
        )}

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

          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login" className="signin-link">Sign In</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;