import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // IMPORT THIS
import './NavigationBar.css';

// --- Icons (Keep your existing icons here) ---
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18C8.10457 18 9 18.8954 9 20Z" fill="white"/>
    <path d="M21 20C21 21.1046 20.1046 22 19 22C17.8954 22 17 21.1046 17 20C17 18.8954 17.8954 18 19 18C20.1046 18 21 18.8954 21 20Z" fill="white"/>
    <path d="M1 1H4L6.68 14.39C6.77144 14.8504 7.02191 15.264 7.38755 15.5583C7.75318 15.8526 8.2107 16.009 8.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Helper to close menu when link is clicked
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
        <div className="logo-circle">
          <span className="logo-text">Hood<br/>Tech</span>
        </div>
      </NavLink>

      {/* Desktop Navigation Links */}
      <ul className="nav-links desktop-only">
        <li><NavLink to="/about" className="nav-item btn-link">About</NavLink></li>
        <li><NavLink to="/customize" className="nav-item btn-link">Customize Your Own</NavLink></li>
        <li><NavLink to="/shop" className="nav-item btn-link">Shop Now</NavLink></li>
        <li><NavLink to="/support" className="nav-item btn-link">Support</NavLink></li>
        <li><NavLink to="/contact" className="nav-item btn-link">Contact Us</NavLink></li>
      </ul>

      {/* Actions: Cart & Hamburger */}
      <div className="navbar-actions">
        <div className="navbar-cart">
          <div className="cart-container">
            <CartIcon />
            <span className="cart-badge">0</span>
          </div>
        </div>
        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <div className={`mobile-menu-overlay ${isMobileOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><NavLink to="/about" onClick={closeMenu} className="mobile-link">About</NavLink></li>
          <li><NavLink to="/customize" onClick={closeMenu} className="mobile-link">Customize Your Own</NavLink></li>
          <li><NavLink to="/shop" onClick={closeMenu} className="mobile-link">Shop Now</NavLink></li>
          <li><NavLink to="/support" onClick={closeMenu} className="mobile-link">Support</NavLink></li>
          <li><NavLink to="/contact" onClick={closeMenu} className="mobile-link">Contact Us</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;