import React from 'react';
import { Link } from 'react-router-dom'; 
import Footer from './Footer';
import './styling/shopLaptop.css';

// Data matching your screenshot
const laptops = [
  { 
    id: 1, 
    name: "ASUS ROG Strix Scar 18", 
    spec: "QHD | 240Hz | RTX50", 
    price: "RM24,299.00", 
    img: "https://dlcdnwebimgs.asus.com/files/media/982b43f2-03f0-4780-b552-cf2a58d515bf/v1/images/Strix_G18_KV_16x9_N-p-2000.webp" 
  },
  { 
    id: 2, 
    name: "MSI Stealth Studio", 
    spec: "QHD | 240Hz | RTX50", 
    price: "RM 11,499.00", 
    img: "https://via.placeholder.com/300x250?text=MSI+Stealth" 
  },
  { 
    id: 3, 
    name: "MSI Katana 15", 
    spec: "QHD | 165Hz | RTX50", 
    price: "RM 5,699.00", 
    img: "https://via.placeholder.com/300x250?text=MSI+Katana" 
  },
  { 
    id: 4, 
    name: "MSI Cyborg 15", 
    spec: "FHD | 144Hz | NVIDIA", 
    price: "RM 3,999.00", 
    img: "https://via.placeholder.com/300x250?text=MSI+Cyborg" 
  },
  { 
    id: 5, 
    name: "MSI Thin 15", 
    spec: "FHD | 144Hz | NVIDIA", 
    price: "RM 4,099.00", 
    img: "https://via.placeholder.com/300x250?text=MSI+Thin" 
  },
  { 
    id: 6, 
    name: "MSI Venture", 
    spec: "COPILOT | 2K Display", 
    price: "RM 3,899.00", 
    img: "https://via.placeholder.com/300x250?text=MSI+Venture" 
  }
];

const ShopLaptop = () => {
  return (
      <div className="shop-page-container">
        
        {/* Header Section */}
        <div className="shop-header">
          <h1 className="shop-title">Laptops <span className="highlight">Collection</span></h1>
          <p className="shop-subtitle">High Performance Machines for Gaming & Work</p>
        </div>

        {/* The Grid of Laptops */}
        <div className="products-grid">
          {laptops.map((laptop) => (
            <div key={laptop.id} className="product-card">
              
              <div className="product-badge">
                {laptop.spec}
              </div>

              <div className="image-container">
                <img src={laptop.img} alt={laptop.name} />
              </div>

              <div className="product-info">
                <h3 className="product-name">{laptop.name}</h3>
                <p className="product-price">{laptop.price}</p>
                
                <button className="buy-btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
  );
};

export default ShopLaptop;