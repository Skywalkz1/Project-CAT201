import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate Total
  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate network delay (2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      clearCart(); // Empty the cart
      alert("Payment Successful! Thank you for your order.");
      navigate('/'); // Redirect to Home
    }, 2000);
  };

  if (cartItems.length === 0) {
    return <div className="checkout-empty">Your cart is empty. Redirecting...</div>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        
        {/* Left Side: Payment Form */}
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

        {/* Right Side: Order Summary */}
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