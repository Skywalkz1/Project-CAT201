import React from 'react';
import './OurLocations.css';
import HeaderBanner from './HeaderBanner';
import mapIcon from './assets/mapIcon.png';
import phoneIcon from './assets/phoneIcon.png';

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
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.107727531313!2d100.29422835194578!3d5.35101743290634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac1ad783126ef%3A0xd81cbeda1c2d1601!2sTaman%20Pekaka%20Apartment%2C%20Jalan%20Pekaka%201%2C%20Taman%20Pekaka%2C%2011700%20Gelugor%2C%20Pulau%20Pinang!5e0!3m2!1sen!2smy!4v1767250218144!5m2!1sen!2smy";

  return (
    <div className="our-locations-container">
      <HeaderBanner headertitle="OUR LOCATIONS"/>

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
            icon={<img src={mapIcon} alt="Location Icon" />}
            title="HOODTECH PC SDN BHD"
            details="TAMAN PEKAKA 1"
          />
          <ContactItem
            icon={<img src={phoneIcon} alt="Phone Icon" />}
            title="CONTACT NUMBER"
            details="+6011-59975191"
          />
        </div>
      </div>
    </div>
  );
};

export default OurLocations;