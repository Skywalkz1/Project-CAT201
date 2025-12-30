import React, { useState } from 'react';
import './Services.css';

const PC_DATA = [
  {
    id: 'cat_cpu_intel',
    name: '01. INTEL Processor',
    products: [
      { id: 'i5_13400', name: 'Intel Core i5-13400F (10 Core/ 16 Thread) - 3 Yrs', price: 859 },
      { id: 'i5_14400', name: 'INTEL CORE I5 14400 (10 CORE/ 16 THREADS/4.6GHZ)-3 Years Warranty', price: 659 },
      { id: 'i7_14700', name: 'Intel Core i7-14700K (20 Core/ 28 Thread) - 3 Yrs', price: 1899 },
    ]
  },
  {
    id: 'cat_cpu_amd',
    name: '02. AMD Ryzen Processor',
    products: [
      { id: 'r5_7600', name: 'AMD Ryzen 5 7600 (6 Core / 12 Thread)', price: 999 },
      { id: 'r7_7800x3d', name: 'AMD Ryzen 7 7800X3D Gaming Processor', price: 1799 },
    ]
  },
  {
    id: 'cat_cooler',
    name: '03. Cooler',
    products: [
        { id: 'cool_air', name: 'Basic Air Cooler 120mm', price: 89 },
        { id: 'cool_aio', name: '240mm AIO Liquid Cooler ARGB', price: 299 },
    ]
  },
   {
    id: 'cat_gpu',
    name: '07. Graphic Card',
    products: [
        { id: 'gpu_4060', name: 'Nvidia RTX 4060 8GB OC', price: 1499 },
    ]
  },
];

function Services() {
  const [cartItems, setCartItems] = useState({});
  const [openCategoryId, setOpenCategoryId] = useState(null);

  const toggleCategory = (categoryId) => {
    setOpenCategoryId(prev => (prev === categoryId ? null : categoryId));
  };

  // UPDATED: Now handles "Swapping"
  const handleSelectProduct = (category, product) => {
    setCartItems(prevCart => {
      const newCart = { ...prevCart };

      // 1. Remove ANY other products from this specific category
      // This ensures we swap the item instead of stacking them
      category.products.forEach(p => {
        delete newCart[p.id]; 
      });

      // 2. Add the new selected product
      newCart[product.id] = 1;
      return newCart;
    });

    // Close dropdown
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
    for (const cat of PC_DATA) {
      const found = cat.products.find(p => p.id === productId);
      if (found) return found;
    }
    return null;
  };

  const grandTotal = Object.entries(cartItems).reduce((total, [productId, qty]) => {
    const product = findProductById(productId);
    return total + (product ? product.price * qty : 0);
  }, 0);

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

      {/* Main Loop */}
      {PC_DATA.map((category) => {
        const selectedProductId = category.products.find(p => cartItems[p.id])?.id;
        const isSelected = !!selectedProductId;
        const isOpen = openCategoryId === category.id;

        // We prepare the content for the "Main Row" here
        let mainRowContent;

        if (isSelected) {
          // --- CASE A: PRODUCT IS SELECTED ---
          const product = findProductById(selectedProductId);
          const qty = cartItems[product.id];
          
          mainRowContent = (
            <div className="product-row selected-mode">
              <button className="btn-square" onClick={() => toggleCategory(category.id)}>
                 {/* Change icon to indicate editing is possible */}
                 {isOpen ? 'x' : '+'} 
              </button>

              {/* Added onClick here to re-open the dropdown */}
              <div 
                className="selection-box clickable" 
                onClick={() => toggleCategory(category.id)}
              >
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
          // --- CASE B: NO PRODUCT SELECTED (Generic Box) ---
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

        // --- RENDER BOTH THE ROW AND THE DROPDOWN ---
        // (Now the dropdown can appear regardless of selection state)
        return (
          <React.Fragment key={category.id}>
            
            {mainRowContent}

            {isOpen && (
              <div className="selection-list-container">
                {category.products.map(product => (
                  <div
                    key={product.id}
                    className="selection-item"
                    // Pass 'category' too so we can clear siblings
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

export default Services;
