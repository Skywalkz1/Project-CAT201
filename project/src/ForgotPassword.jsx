import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    
    setTimeout(() => {
      console.log(`Password reset link sent to: ${email}`);
      setStatus('success');
    }, 1500);
  };

  
  if (status === 'success') {
    return (
      <div className="forgot-page-container">
        <div className="forgot-card success-card">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Check your Inbox</h2>
          <p>We have sent a password reset link to <span className="highlight">{email}</span>.</p>
          
          <div className="success-actions">
            <button 
              className="resend-btn" 
              onClick={() => setStatus('idle')}
            >
              Resend Email
            </button>
            <Link to="/login" className="back-link">Back to Sign In</Link>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="forgot-page-container">
      <div className="forgot-card">
        <div className="forgot-header">
          <h2>Forgot <span className="highlight">Password?</span></h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="forgot-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
            />
          </div>

          <button 
            type="submit" 
            className="send-link-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
          </button>

          <div className="forgot-footer">
            <Link to="/login" className="back-link-flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;