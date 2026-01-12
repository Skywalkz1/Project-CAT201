import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { useCart } from './CartContext'; 

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const ramOptions = [
    { name: "16GB DDR5 (Standard)", price: 0 },
    { name: "32GB DDR5 (+RM 400)", price: 400 },
    { name: "64GB DDR5 (+RM 900)", price: 900 },
  ];

  const ssdOptions = [
    { name: "1TB NVMe SSD (Standard)", price: 0 },
    { name: "2TB NVMe SSD (+RM 350)", price: 350 },
    { name: "4TB NVMe SSD (+RM 900)", price: 900 },
  ];

  const [quantity, setQuantity] = useState(1);
  const [selectedRam, setSelectedRam] = useState(ramOptions[0]);
  const [selectedSSD, setSelectedSSD] = useState(ssdOptions[0]);
  const [showRam, setShowRam] = useState(false);
  const [showSSD, setShowSSD] = useState(false);

  
  useEffect(() => {
    
    fetch(`http://localhost:8080/servlet_jsx_playground_war_exploded/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        navigate('/shop'); 
      });
  }, [id, navigate]);

  if (loading || !product) return <div className="detail-loading" style={{color:'white', padding:'40px'}}>Loading Product...</div>;

  const unitPrice = product.basePrice + selectedRam.price + selectedSSD.price; 
  const totalPrice = unitPrice * quantity; 

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      img: product.img, 
      ram: selectedRam.name, 
      ssd: selectedSSD.name, 
      quantity: quantity, 
      totalPrice: totalPrice, 
      unitPrice: unitPrice 
    };

    addToCart(cartItem); 
  };

  return (
    <div className="detail-page">
      
      <div className="detail-nav">
         <button onClick={() => navigate('/shop')} className="back-link">
           &larr; Back to Shop
         </button>
      </div>

      <div className="detail-container">
        
        
        <div className="detail-left">
          <div className="image-box">
             <div className="image-header">
                {product.badge && product.badge.map((b, index) => (
                    <div key={index} className="spec-badge-text">
                        <span className="spec-title">{b}</span>
                        <span className="spec-sub">Performance</span> 
                    </div>
                ))}
             </div>
             <div className="product-title-overlay">{product.name}</div>
             <img src={product.img} alt={product.name} className="hero-laptop-img" />
          </div>
        </div>

        
        <div className="detail-right">
          <h1 className="detail-title">{product.name}</h1>
          <p className="price-range">
            Starting From RM{product.basePrice.toLocaleString()}.00 - RM{product.maxPrice.toLocaleString()}.00
          </p>

          <div className="action-row">
            <button className="outline-btn">Copy Specs</button>
            <button className="outline-btn">View More</button>
          </div>

          
          <div className="config-section">
            <label>Model</label>
            <select className="model-select">
                <option>Ultra 9 RTX5070 TI 2TB</option>
                <option>Ultra 7 RTX4060 1TB</option>
            </select>

            
            <div className="accordion">
                <div 
                  className={`accordion-header ${showRam ? 'active' : ''}`} 
                  onClick={() => setShowRam(!showRam)}
                >
                    <span className="arrow">▶</span> Ram Upgrade
                </div>
                {showRam && (
                    <div className="accordion-body">
                        {ramOptions.map((opt, i) => (
                            <div 
                                key={i} 
                                className={`option-row ${selectedRam.name === opt.name ? 'selected' : ''}`}
                                onClick={() => setSelectedRam(opt)}
                            >
                                <span>{opt.name}</span>
                                {opt.price > 0 && <span className="opt-price">+RM {opt.price}</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            
            <div className="accordion">
                <div 
                  className={`accordion-header ${showSSD ? 'active' : ''}`} 
                  onClick={() => setShowSSD(!showSSD)}
                >
                    <span className="arrow">▶</span> Add On / Replace - SSD
                </div>
                {showSSD && (
                    <div className="accordion-body">
                         {ssdOptions.map((opt, i) => (
                            <div 
                                key={i} 
                                className={`option-row ${selectedSSD.name === opt.name ? 'selected' : ''}`}
                                onClick={() => setSelectedSSD(opt)}
                            >
                                <span>{opt.name}</span>
                                {opt.price > 0 && <span className="opt-price">+RM {opt.price}</span>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>

          
          <div className="total-section">
             <span>Order total:</span>
             <span className="total-price">RM{totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="detail-footer">
             <div className="qty-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
             </div>
             
             <button className="add-cart-btn" onClick={handleAddToCart}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Add to cart
             </button>

             <button className="buy-now-btn">Buy Now</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;