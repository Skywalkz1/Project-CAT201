import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Customize.css';

function Customize() {
  const navigate = useNavigate(); 
  const [pcData, setPcData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  
  const [cartItems, setCartItems] = useState({});
  const [openCategoryId, setOpenCategoryId] = useState(null);

  
  useEffect(() => {
    fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/customize')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPcData(data); 
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

  const handleNext = () => {
    const selectedProducts = [];


    for (const [productId, qty] of Object.entries(cartItems)) {
      const product = findProductById(productId);
      
      if (product && qty > 0) {
        
        let categoryName = '';
        for (const cat of pcData) {
          if (cat.products.find(p => p.id === productId)) {
            categoryName = cat.name.replace(/^--\s*|\s*--$/g, ''); 
            break;
          }
        }

        
        selectedProducts.push({
          ...product,
          quantity: qty,
          total: product.price * qty,
          categoryName: categoryName
        });
      }
    }


    if (selectedProducts.length === 0) {
      alert("Please select at least one item before proceeding.");
      return;
    }


    navigate('/quotation', { state: { selectedProducts, grandTotal } });
  };

  
  if (loading) return <div className="builder-container" style={{color:'white', textAlign:'center', marginTop:'50px'}}>Loading PC Parts...</div>;
  if (error) return <div className="builder-container" style={{color:'red', textAlign:'center', marginTop:'50px'}}>{error}</div>;

  return (
    <div className="builder-container">
      
      <div className="summary-bar">
        <button className="reset-btn" onClick={() => setCartItems({})}>Reset</button>
        <div className="grand-total-section">
          <span>Total Price:</span>
          <span className="grand-total-price">RM {grandTotal}</span>
        </div>
        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>

      <div className="grid-header">
        <div>Add</div>
        <div className="header-product-col">Products</div>
        <div>Quantity</div>
        <div>Total</div>
      </div>

      
      {pcData.map((category) => {
        const selectedProductId = category.products.find(p => cartItems[p.id])?.id;
        const isSelected = !!selectedProductId;
        const isOpen = openCategoryId === category.id;
        
        
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