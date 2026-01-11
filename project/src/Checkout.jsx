import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); // Calculate total items

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;

    if (!user) {
        alert("Please login to complete purchase");
        navigate('/login');
        return;
    }

    
    const orderData = {
        userId: user.id,
        total: grandTotal,
        itemCount: itemCount
    };

    try {
        
        
        const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
             // 3. Success Flow
             clearCart(); 
             alert("Payment Successful! Order saved.");
             navigate('/profile'); 
        } else {
             alert("Payment failed on server.");
        }

    } catch (error) {
        console.error("Payment error:", error);
        alert("Network error.");
    } finally {
        setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return <div className="checkout-empty">Your cart is empty. Redirecting...</div>;
  }

 
  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        
        <div className="payment-section">
          <h2>Payment Details</h2>
          <form onSubmit={handlePayment}>
             
            <div className="form-group">
              <label>Cardholder Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Card Number</label>
              <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
            </div>
            <div className="row">
              <div className="form-group half">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" maxLength="5" required />
              </div>
              <div className="form-group half">
                <label>CVV</label>
                <input type="text" placeholder="123" maxLength="3" required />
              </div>
            </div>

            <button type="submit" className="pay-btn" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay RM ${grandTotal.toLocaleString()}`}
            </button>
          </form>
        </div>

        
        <div className="summary-section">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map((item, index) => (
              <div key={index} className="summary-row">
                <span>{item.name} (x{item.quantity})</span>
                <span>RM {item.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>RM {grandTotal.toLocaleString()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;