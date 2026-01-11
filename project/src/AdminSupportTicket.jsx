import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Re-using existing admin styles

const AdminSupportTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Security Check & Fetch Data
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
      fetchTickets();
    }
  }, [navigate]);

  const fetchTickets = async () => {
    try {
      const res = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/admin/tickets');
      const data = await res.json();
      setTickets(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  // 2. Handle Status Update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/admin/tickets', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      // Refresh list locally
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // Helper for Status Color
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Open': return { color: '#ef4444', fontWeight: 'bold' }; // Red
      case 'In Progress': return { color: '#f59e0b', fontWeight: 'bold' }; // Orange
      case 'Closed': return { color: '#10b981', fontWeight: 'bold' }; // Green
      default: return { color: 'white' };
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Support Tickets</h1>
      
      <div className="admin-form-container" style={{textAlign: 'center', color: '#94a3b8'}}>
        <p>Manage customer inquiries and support requests.</p>
      </div>

      {loading ? (
        <p style={{textAlign: 'center', color: 'white'}}>Loading...</p>
      ) : (
        <table className="products-table">
          <thead>
            <tr className="table-head-row">
              <th className="table-header">Date</th>
              <th className="table-header">Customer</th>
              <th className="table-header">Order ID</th>
              <th className="table-header" style={{width: '40%'}}>Message</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="table-row">
                <td className="table-cell">{new Date(t.date).toLocaleDateString()}</td>
                <td className="table-cell">
                  <div style={{fontWeight:'bold'}}>{t.name}</div>
                  <div style={{fontSize:'0.85rem', color:'#64748b'}}>{t.email}</div>
                </td>
                <td className="table-cell">{t.orderId || '-'}</td>
                <td className="table-cell" style={{ lineHeight: '1.4' }}>{t.message}</td>
                <td className="table-cell">
                  <select 
                    value={t.status} 
                    onChange={(e) => handleStatusChange(t.id, e.target.value)}
                    style={{
                      padding: '5px',
                      borderRadius: '4px',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      ...getStatusStyle(t.status)
                    }}
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminSupportTickets;