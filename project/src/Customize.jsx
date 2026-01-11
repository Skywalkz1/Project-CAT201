import React, { useState, useEffect } from 'react';
import './Customize.css';

// Remove the hardcoded const PC_DATA = [...] completely.

function Customize() {
  const [pcData, setPcData] = useState([]); // State to hold DB data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  const [cartItems, setCartItems] = useState({});
  const [openCategoryId, setOpenCategoryId] = useState(null);

  // --- NEW: Fetch Data from Servlet ---
  useEffect(() => {
    fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/customize')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPcData(data); // Store the data from Java
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch parts:", err);
        setError("Could not load PC parts. Is the backend running?");
        setLoading(false);
      });
  }, []);

  const toggleCategory = (categoryId) => {
    setOpenCategoryId(prev => (prev === categoryId ? null : categoryId));
  };

  const handleSelectProduct = (category, product) => {
    setCartItems(prevCart => {
      const newCart = { ...prevCart };
      category.products.forEach(p => {
        delete newCart[p.id]; 
      });
      newCart[product.id] = 1;
      return newCart;
    });
    setOpenCategoryId(null);
  };

  const handleQuantityChange = (productId, change) => {
    setCartItems(prevCart => {
      const currentQty = prevCart[productId] || 0;
      const newQty = currentQty + change;
      if (newQty <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      } 
      return { ...prevCart, [productId]: newQty };
    });
  };

  // Helper to find product inside the DYNAMIC pcData
  const findProductById = (productId) => {
    for (const cat of pcData) {
      const found = cat.products.find(p => p.id === productId);
      if (found) return found;
    }
    return null;
  };

  const grandTotal = Object.entries(cartItems).reduce((total, [productId, qty]) => {
    const product = findProductById(productId);
    return total + (product ? product.price * qty : 0);
  }, 0);

  // --- LOADING STATE ---
  if (loading) return <div className="builder-container" style={{color:'white', textAlign:'center', marginTop:'50px'}}>Loading PC Parts...</div>;
  if (error) return <div className="builder-container" style={{color:'red', textAlign:'center', marginTop:'50px'}}>{error}</div>;

  return (
    <div className="builder-container">
      {/* Summary Bar */}
      <div className="summary-bar">
        <button className="reset-btn" onClick={() => setCartItems({})}>Reset</button>
        <div className="grand-total-section">
          <span>Total Price:</span>
          <span className="grand-total-price">RM {grandTotal}</span>
        </div>
        <button className="next-btn">Next</button>
      </div>

      <div className="grid-header">
        <div>Add</div>
        <div className="header-product-col">Products</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>

      {/* Main Loop using pcData from Database */}
      {pcData.map((category) => {
        const selectedProductId = category.products.find(p => cartItems[p.id])?.id;
        const isSelected = !!selectedProductId;
        const isOpen = openCategoryId === category.id;
        
        // ... (The rest of your JSX logic remains exactly the same)
        let mainRowContent;

        if (isSelected) {
          const product = findProductById(selectedProductId);
          const qty = cartItems[product.id];
          
          mainRowContent = (
            <div className="product-row selected-mode">
              <button className="btn-square" onClick={() => toggleCategory(category.id)}>
                 {isOpen ? 'x' : '+'} 
              </button>
              <div className="selection-box clickable" onClick={() => toggleCategory(category.id)}>
                {product.name}
              </div>
              <div className="qty-display center-content">
                  <div className="qty-controls">
                      <button className="qty-btn-small" onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                      <div className="qty-input-display">{qty}</div>
                      <button className="qty-btn-small" onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                  </div>
              </div>
              <div className="total-display">{product.price * qty}</div>
            </div>
          );
        } else {
          mainRowContent = (
            <div className="product-row">
              <button className="btn-square" onClick={() => toggleCategory(category.id)}>
                {isOpen ? '-' : '+'}
              </button>
              <div className="selection-box clickable" onClick={() => toggleCategory(category.id)}>
                -- {category.name} --
              </div>
              <div className="qty-display box-style">0</div>
              <div className="total-display">0</div>
            </div>
          );
        }

        return (
          <React.Fragment key={category.id}>
            {mainRowContent}
            {isOpen && (
              <div className="selection-list-container">
                {category.products.map(product => (
                  <div
                    key={product.id}
                    className="selection-item"
                    onClick={() => handleSelectProduct(category, product)} 
                  >
                    <span>{product.name}</span>
                    <span className="item-price">RM {product.price}</span>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default Customize;