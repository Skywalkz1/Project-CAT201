import React from 'react'; 
import { Link } from 'react-router-dom';
import Footer from './Footer';
import './Shop.css'; 

// ... (keep your laptops data exactly as it is) ...
const laptops = [
  { 
    id: 1, 
    name: "HoodTech Beast X1", 
    spec: "RTX 4090 | i9-13900K", 
    price: "RM 15,999", 
    img: "https://via.placeholder.com/300x200?text=Beast+X1" 
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
    name: "HoodTech Workstation", 
    spec: "Xeon W | RTX A5000", 
    price: "RM 18,999", 
    img: "https://via.placeholder.com/300x200?text=Workstation" 
  }
];

function Shop() {
  return (
    <>
      
      <div className="shop-container">
        <h1 className="shop-title">Laptops <span className="highlight">Collection</span></h1>
        
        <div className="products-grid">
          {laptops.map((laptop) => (
            <div key={laptop.id} className="product-card">
              <div className="product-badge">{laptop.spec}</div>
              <div className="image-container">
                <img src={laptop.img} alt={laptop.name} />
              </div>
              <div className="product-info">
                <h3 className="product-name">{laptop.name}</h3>
                <p className="product-price">{laptop.price}</p>
                <Link to="/shoplaptop" className="buy-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Shop;