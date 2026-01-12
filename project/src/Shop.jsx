import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();
  
  
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    
    fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLaptops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching laptops:", err);
        setError("Failed to load products. Is the Java backend running?");
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <div className="shop-loading" style={{color:'white', padding:'20px'}}>Loading Laptops...</div>;
  if (error) return <div className="shop-error" style={{color:'red', padding:'20px'}}>{error}</div>;

  return (
	  <div className="shop-page-container">
		
		<div className="shop-header">
		  <h1 className="shop-title">Laptops <span className="highlight">Collection</span></h1>
		  <p className="shop-subtitle">High Performance Machines for Gaming & Work</p>
		</div>

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
				<p className="product-price">RM {laptop.basePrice.toLocaleString()}.00</p>
				
				<button 
                  className="buy-btn" 
                  onClick={() => handleViewDetails(laptop.id)}
                >
                  View Details
                </button>
			  </div>
			</div>
		  ))}
		</div>
		
	  </div>
  );
};

export default Shop;