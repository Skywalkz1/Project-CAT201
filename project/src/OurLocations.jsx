import React from 'react';
import './OurLocations.css'; // Assuming you have a separate CSS file

const ContactItem = ({ icon, title, details }) => (
  <div className="contact-item">
    <div className="contact-icon">{icon}</div>
    <div className="contact-details">
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  </div>
);

const OurLocations = () => {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.785950128654!2d101.7520813153256!3d3.1513990540143683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3708c43274d1%3A0x869732153907588a!2sIDEAL%20TECH%20PC%20Sdn%20Bhd!5e0!3m2!1sen!2smy!4v1678888888888!5m2!1sen!2smy";

  return (
    <div className="our-locations-container">
      <header className="location-header">
        <h1>Our Locations</h1>
      </header>

      <div className="location-content">
        <div className="map-container">
          <iframe
            title="Google Map"
            src={mapSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="contact-info">
          <ContactItem
            icon={<i className="fas fa-store-alt" />}
            title="HOODTECH PC SDN BHD "
            details="TAMAN PEKAKA 1"
          />
          <ContactItem
            icon={<i className="fas fa-phone-alt" />}
            title="CONTACT NUMBER"
            details="+6011-59975191"
          />
          {/* Add more ContactItem components for email, hours, etc. if needed */}
        </div>
      </div>

     
    </div>
  );
};

export default OurLocations;