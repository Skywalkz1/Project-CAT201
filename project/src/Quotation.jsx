import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import './Quotation.css';

const Quotation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { selectedProducts, grandTotal } = location.state || {};

  
  const [quoteId] = useState('QT-' + Math.floor(100000 + Math.random() * 900000));
  
  
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }

    
    if (!selectedProducts || selectedProducts.length === 0) {
      navigate('/customize');
    }
  }, [selectedProducts, navigate]);

  if (!selectedProducts) return null;

  
  const handleSaveQuotation = async () => {
    if (!currentUser) {
      alert("Please login first to save this quotation.");
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/quotation/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId: quoteId,
          userId: currentUser.id,
          grandTotal: grandTotal,
          items: selectedProducts
        })
      });

      if (response.ok) {
        setIsSaved(true);
        alert("Quotation saved to your account!");
      } else {
        alert("Failed to save quotation.");
      }
    } catch (error) {
      console.error("Save error", error);
      alert("Server error.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="quotation-page">
      <div className="quotation-paper">
        <div className="quotation-header">
          <div className="company-branding">
            <h1>HoodTech</h1>
            <p>Your Custom PC Specialist</p>
          </div>
          <div className="document-info">
            <h2>QUOTATION</h2>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            
            <p><strong>Quote ID:</strong> {quoteId}</p> 
          </div>
        </div>

        <table className="quotation-table">
          <thead>
            <tr>
              <th className="col-no">No.</th>
              <th className="col-desc">Item Description</th>
              <th className="col-cat">Category</th>
              <th className="col-price">Unit Price</th>
              <th className="col-qty">Qty</th>
              <th className="col-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((item, index) => (
              <tr key={item.id}>
                <td className="col-no">{index + 1}</td>
                <td className="col-desc">{item.name}</td>
                <td className="col-cat">{item.categoryName}</td>
                <td className="col-price">RM {item.price.toFixed(2)}</td>
                <td className="col-qty">{item.quantity}</td>
                <td className="col-total">RM {item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="quotation-footer">
          <div className="totals-section">
            <div className="total-row grand-total">
              <span>Grand Total:</span>
              <span>RM {grandTotal.toFixed(2)}</span>
            </div>
            <p className="tax-note">*All prices are inclusive of applicable taxes.</p>
          </div>
        </div>
      </div>

      <div className="quotation-actions hide-on-print">
        <button className="action-btn back-btn" onClick={() => navigate('/customize')}>Back</button>
        
        
        <button 
          className="action-btn checkout-btn" 
          onClick={handleSaveQuotation}
          disabled={isSaved}
          style={{ backgroundColor: isSaved ? '#10b981' : '#38bdf8' }} 
        >
          {isSaved ? "Saved!" : "Save Quotation"}
        </button>

        <button className="action-btn print-btn" onClick={handlePrint}>Print / PDF</button>
      </div>
    </div>
  );
};

export default Quotation;