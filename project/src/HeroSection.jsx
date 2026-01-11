import React from 'react';
import './HeroSection.css';
import imagepc from './assets/pc.png'
import { Link } from 'react-router-dom'; 



const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="content-wrapper">
        
        <div className="text-content">
          <h1>
            Custom-Built PCs,<br />
            For Your Convenience.
          </h1>
          <p className="subtitle">
            Personal computers should transcend machines, they must be
            tailored experiences designed for you.
          </p>

          <div className="cta-group">
            <a href="shop"><button className="btn btn-primary">Shop Now</button></a>
            
            <a href="customize"><button className="btn btn-outline">Customize Your Own</button></a>
          </div>

          <div className="reviews">
            <div className="stars">
              
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <a href="#1" className="review-link">
              Over 4,800+ 5 Star Reviews
            </a>
          </div>
        </div>

        
        <div className="image-content">
          <img 
            src={imagepc} 
            alt="White Gaming PC" 
            className="pc-image pc-front" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;