import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <>
      <div className="support-page">
        
        {/* HERO HEADER */}
        <div className="support-header">
          <h1 className="support-title">Support <span className="highlight">Center</span></h1>
          <p className="support-subtitle">We are here to help. Search our FAQs or contact our team directly.</p>
        </div>

        {/* QUICK ACTION CARDS */}
        <div className="support-grid">
          <div className="support-card">
            <h3>WARRANTY CHECK</h3>
            <p>Check the warranty status of your HoodTech custom build.</p>
            <button className="support-btn">Check Status</button>
          </div>
          <div className="support-card">
            <h3>DRIVERS & DOWNLOADS</h3>
            <p>Get the latest BIOS updates and drivers for your system.</p>
            <button className="support-btn">Download</button>
          </div>
          <div className="support-card">
            <h3>TRACK ORDER</h3>
            <p>View the current assembly stage or shipping status.</p>
            <button className="support-btn">Track Now</button>
          </div>
        </div>

        {/* MAIN CONTENT: FAQ & FORM */}
        <div className="support-content-row">
          
          {/* LEFT: CONTACT FORM */}
          <div className="contact-section">
            <h2>Send us a Message</h2>
            <form className="contact-form">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label>Order ID (Optional)</label>
                <input type="text" placeholder="#HT-12345" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?"></textarea>
              </div>
              <button type="button" className="submit-btn">Submit Ticket</button>
            </form>
          </div>

          {/* RIGHT: FAQ */}
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