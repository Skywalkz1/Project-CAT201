import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  
  const [quotations, setQuotations] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  
  const [purchases, setPurchases] = useState([]); 
  const [loadingPurchases, setLoadingPurchases] = useState(false);

  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    setNewName(userData.fullName);
  }, [navigate]);

  
useEffect(() => {
    if (user && user.id) {
      
      setLoadingHistory(true);
      fetch(`http://localhost:8080/servlet_jsx_playground_war_exploded/api/quotation/history?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setQuotations(data);
          setLoadingHistory(false);
        })
        .catch(err => setLoadingHistory(false));
        
      
      setLoadingPurchases(true);
      fetch(`http://localhost:8080/servlet_jsx_playground_war_exploded/api/orders?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          setPurchases(data); 
          setLoadingPurchases(false);
        })
        .catch(err => {
            console.error(err);
            setLoadingPurchases(false);
        });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: user.id, 
          fullName: newName 
        })
      });

      if (response.ok) {
        const updatedUser = { ...user, fullName: newName };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("storage")); 
    navigate('/');
  };

  const maskEmail = (email) => {
    if (!email) return '';
    const [name, domain] = email.split('@');
    const maskedName = name.substring(0, 2) + '*'.repeat(name.length - 2);
    return `${maskedName}@${domain}`;
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        <div className="profile-header">
          <h2>My Profile</h2>
          <p>Manage and protect your account</p>
        </div>

        
        <div className="profile-content">
          <div className="profile-row">
            <label>Name</label>
            <div className="input-wrapper">
              <input type="text" value={newName} onChange={handleInputChange} className="profile-input"/>
            </div>
          </div>
          <div className="profile-row">
            <label>Email</label>
            <div className="email-display"><span>{maskEmail(user.email)}</span></div>
          </div>
          <div className="profile-footer">
             <button onClick={handleLogout} className="logout-btn">Logout</button>
             <button className="save-btn" onClick={handleSave} disabled={isSaving}>
               {isSaving ? "Saving..." : "Save"}
             </button>
          </div>
        </div>

        
        <div className="history-section">
          <h3>Quotation History</h3>
          <div className="history-table-container">
            {loadingHistory ? (
              <p style={{textAlign:'center', color:'#888'}}>Loading history...</p>
            ) : quotations.length === 0 ? (
              <p style={{textAlign:'center', color:'#888'}}>No saved quotations yet.</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Quote ID</th>
                    <th>Total (RM)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((q) => (
                    <tr key={q.quoteId}>
                      <td>{new Date(q.date).toLocaleDateString()}</td> 
                      <td className="quote-id-cell">{q.quoteId}</td>
                      <td>{q.total.toFixed(2)}</td>
                      <td><span className="status-badge">Saved</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        
        <div className="history-section">
          <h3>Purchase History</h3>
          <div className="history-table-container">
            {loadingPurchases ? (
              <p style={{textAlign:'center', color:'#888'}}>Loading purchases...</p>
            ) : purchases.length === 0 ? (
              <p style={{textAlign:'center', color:'#888'}}>No purchases found.</p>
            ) : (
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Total (RM)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((p) => (
                    <tr key={p.orderId}>
                      <td>{p.date}</td> 
                      <td className="quote-id-cell">{p.orderId}</td>
                      <td>{p.itemCount} Items</td>
                      <td>{p.total}</td>
                      <td><span className="status-badge">{p.status}</span></td>
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

export default Profile;