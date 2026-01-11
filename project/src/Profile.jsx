import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // New State for the form input
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load User Data
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    setNewName(userData.fullName); // Initialize input with current name
  }, [navigate]);

  // 2. Handle Name Change Input
  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  // 3. Save Changes to Backend
  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    try {
      // Send PUT request to Java Backend
      const response = await fetch('http://localhost:8080/servlet_jsx_playground_war_exploded/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: user.id, 
          fullName: newName 
        })
      });

      if (response.ok) {
        // A. Update Local User State
        const updatedUser = { ...user, fullName: newName };
        setUser(updatedUser);
        
        // B. Update LocalStorage (So the change persists on refresh)
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

          {/* Row 2: Name (Now Editable) */}
          <div className="profile-row">
            <label>Name</label>
            <div className="input-wrapper">
              <input 
                type="text" 
                value={newName} // Controlled Input
                onChange={handleInputChange} // Handle Typing
                className="profile-input"
              />
            </div>
          </div>

          {/* Row 3: Email */}
          <div className="profile-row">
            <label>Email</label>
            <div className="email-display">
              <span>{maskEmail(user.email)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="profile-footer">
             <button onClick={handleLogout} className="logout-btn">
               Logout
             </button>
             
             {/* Save Button now calls handleSave */}
             <button 
               className="save-btn" 
               onClick={handleSave}
               disabled={isSaving}
               style={{ opacity: isSaving ? 0.7 : 1 }}
             >
               {isSaving ? "Saving..." : "Save"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;