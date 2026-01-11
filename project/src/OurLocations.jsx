import React from 'react';
import './OurLocations.css';
import locationBg from './assets/image_3a7561.jpg';


const StoreIconSVG = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const PhoneIconSVG = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

const MailIconSVG = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const ClockIconSVG = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const ContactItem = ({ icon, title, details }) => (
  <div className="contact-item">
    <div className="contact-icon-circle">
        {icon}
    </div>
    <div className="contact-text-block">
      <h3>{title}</h3>
      <div className="contact-p-wrapper">{details}</div>
    </div>
  </div>
);

const OurLocations = () => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.407561800793!2d100.29904127498372!3d5.354611594624127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1a96f010e97%3A0x8b91d5d092b91828!2sSchool%20of%20Computer%20Sciences%2C%20USM!5e0!3m2!1sen!2smy!4v1768135561395!5m2!1sen!2smy";
  return (
    <div className="our-locations-page">
      
      
      <div className="location-banner">
        <div className="banner-overlay">
            <h1>Our Locations</h1>
        </div>
      </div>

      <div className="our-locations-container">
        <div className="location-content-wrapper">
          
          
          <div className="map-wrapper">
            <iframe
              title="HoodTech Location"
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          
          <div className="contact-list">
            
            <ContactItem
              icon={<StoreIconSVG />}
              title="HOODTECH PC SDN BHD HQ"
              details={<p>School of Computer Science, Universiti Sains Malaysia,<br/>11800 Penang, Malaysia</p>}
            />
            
            <ContactItem
              icon={<PhoneIconSVG />}
              title="CONTACT NUMBER"
              details={<p>+60 4-650 1234 / +60 12-345 6789</p>}
            />

            <ContactItem
              icon={<MailIconSVG />}
              title="EMAIL ADDRESS"
              details={<p>sales@hoodtech.com.my</p>}
            />

            <ContactItem
              icon={<ClockIconSVG />}
              title="BUSINESS HOURS"
              details={
                  <>
                      <p>Monday – Saturday: 9.00am – 6.00pm</p>
                      <p>Sunday: Closed</p>
                  </>
              }
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurLocations;