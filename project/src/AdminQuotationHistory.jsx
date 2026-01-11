import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; 

const AdminQuotationHistory = () => {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role.toLowerCase() !== 'admin') {
      alert("Access Denied");
      navigate('/');
    } else {
      fetchQuotations();
    }
  }, [navigate]);

  const fetchQuotations = async () => {
    try {
      const res = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/admin/quotations');
      const data = await res.json();
      setQuotations(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Customer Quotations</h1>
      
      <div className="admin-form-container" style={{textAlign: 'center', color: '#94a3b8'}}>
        <p>Viewing all quotation queries submitted by users.</p>
      </div>

      {loading ? (
        <p style={{textAlign: 'center', color: 'white'}}>Loading...</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr className="table-head-row">
              <th className="table-header">Date</th>
              <th className="table-header">Quote ID</th>
              <th className="table-header">Customer Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q) => (
              <tr key={q.quoteId} className="table-row">
                <td className="table-cell">{new Date(q.createdAt).toLocaleDateString()}</td>
                <td className="table-cell" style={{color: '#38bdf8', fontFamily: 'monospace'}}>{q.quoteId}</td>
                <td className="table-cell">{q.userName}</td>
                <td className="table-cell">{q.userEmail}</td>
                <td className="table-cell" style={{fontWeight: 'bold'}}>RM {q.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminQuotationHistory;