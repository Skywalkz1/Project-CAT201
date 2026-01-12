import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import './Support.css';

const Support = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/support/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Ticket submitted! We will contact you shortly.");
        setFormData(prev => ({ ...prev, orderId: '', message: '' }));
      } else {
        alert("Failed to submit ticket. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="support-page">
        
        
        <div className="support-header">
          <h1 className="support-title">Support <span className="highlight">Center</span></h1>
          <p className="support-subtitle">We are here to help. Search our FAQs or contact our team directly.</p>
        </div>

        
        <div className="support-grid">
          <div className="support-card">
            <h3>WARRANTY CHECK</h3>
            <p>Check the warranty status of your HoodTech custom build.</p>
            <button className="support-btn">Check Status</button>
          </div>
          <div className="support-card">
            <h3>DRIVERS & DOWNLOADS</h3>
            <p>Get the latest BIOS updates and drivers for your system.</p>
            <a href="https://www.asus.com/my/support/download-center/" target="_blank" rel="noopener noreferrer">
                <button className="support-btn">Download</button>
            </a>
          </div>
          <div className="support-card">
            <h3>TRACK ORDER</h3>
            <p>View the current assembly stage or shipping status.</p>
            <button className="support-btn">Track Now</button>
          </div>
        </div>

        
        <div className="support-content-row">
          
          
          <div className="contact-section">
            <h2>Send us a Message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    name="name"
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
              </div>
              <div className="form-group">
                <label>Order ID (Optional)</label>
                <input 
                    type="text" 
                    name="orderId"
                    placeholder="#HT-12345" 
                    value={formData.orderId}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                    rows="5" 
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? "Sending..." : "Submit Ticket"}
              </button>
            </form>
          </div>

          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <h4>How long does shipping take?</h4>
              <p>Custom builds typically take 5-7 working days to assemble and test before shipping.</p>
            </div>
            <div className="faq-item">
              <h4>What is the warranty period?</h4>
              <p>All HoodTech PCs come with a standard 3-Year Warranty on parts and labor.</p>
            </div>
            <div className="faq-item">
              <h4>Can I upgrade my PC later?</h4>
              <p>Yes! We use standard components, so you can easily upgrade your GPU, RAM, or Storage in the future.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer installment plans?</h4>
              <p>Yes, we support Atome and GrabPayLater for 3-month installments.</p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default Support;