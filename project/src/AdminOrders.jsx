import React, { useState, useEffect } from 'react';
import './Profile.css'; 

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/orders')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="profile-container" style={{paddingTop: '100px'}}>
      <div className="profile-card" style={{maxWidth: '1000px'}}>
        <div className="profile-header">
          <h2>Admin Dashboard</h2>
          <p>View all customer orders</p>
        </div>

        <div className="history-section">
          <h3>All Orders</h3>
          <div className="history-table-container">
            {loading ? <p>Loading...</p> : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Items</th>
                    <th>Total (RM)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.date}</td>
                      <td className="quote-id-cell">{order.orderId}</td>
                      <td>{order.userId}</td>
                      <td>{order.itemCount}</td>
                      <td>{order.total.toLocaleString()}</td>
                      <td><span className="status-badge">{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;