import React from 'react';
import './Cart.css';
import { NavLink } from 'react-router-dom';
import { useCart } from './CartContext'; 
import { useNavigate } from 'react-router-dom'; 

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate(); 

  
  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="cart-page">
      <div className="cart-container-main">
        <h1>Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <NavLink to="/shop" className="checkout-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Start Shopping
            </NavLink>
          </div>
        ) : (
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item-row">
                
                
                <img src={item.img} alt={item.name} className="cart-item-img" />
                
                
                <div className="item-info">
                   <h3>{item.name}</h3>
                   <div className="item-specs">
                     {item.ram} | {item.ssd}
                   </div>
                   <div className="item-qty">
                     Qty: {item.quantity}
                   </div>
                </div>

                
                <div className="item-actions">
                   <span className="item-price">
                     RM {item.totalPrice.toLocaleString()}
                   </span>
                   
                   <button 
                     className="remove-btn"
                     onClick={() => removeFromCart(index)}
                     title="Remove this item"
                   >
                     Remove
                   </button>
                </div>
              </div>
            ))}

            
            <div className="cart-summary">
                <div>
                   <span className="total-label">Subtotal:</span>
                   <span className="grand-total">RM {grandTotal.toLocaleString()}</span>
                </div>
              <button 
                  className="checkout-btn" 
                  onClick={() => navigate('/checkout')}
                >
                    Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;