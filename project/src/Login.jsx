import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  
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
    setIsLoading(true);

    try {
      
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      
      if (response.ok) {
        const userData = await response.json();
        console.log('Login Successful:', userData);
        
        
        localStorage.setItem('user', JSON.stringify(userData));

        
        navigate('/'); 
      } else {
        
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setErrorMessage('Server is not responding. Is Tomcat running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome <span className="highlight">Back</span></h2>
          <p>Sign in to access your HoodTech account</p>
        </div>

        
        {errorMessage && (
          <div style={{ color: '#ff4d4d', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
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

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup" className="signup-link">Create Account</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;