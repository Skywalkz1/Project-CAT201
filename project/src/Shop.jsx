import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { laptops } from './productsData'; // <--- Import the shared data
import './Shop.css';

const Shop = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    navigate(`/product/${id}`);
  };

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
				<p className="product-price">RM {laptop.basePrice.toLocaleString()}.00</p>
				
                {/* Updated Button to use onClick */}
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