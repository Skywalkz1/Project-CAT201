// 1. The Import Section (Keep this at the top)
import { Link } from 'react-router-dom';
import './navbar.css';

// Simple SVG for the dropdown arrow (down chevron)
const ChevronDown = () => (
  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '5px' }}>
    <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG for the Shopping Cart
const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20C5 18.8954 5.89543 18 7 18C8.10457 18 9 18.8954 9 20Z" fill="white"/>
    <path d="M21 20C21 21.1046 20.1046 22 19 22C17.8954 22 17 21.1046 17 20C17 18.8954 17.8954 18 19 18C20.1046 18 21 18.8954 21 20Z" fill="white"/>
    <path d="M1 1H4L6.68 14.39C6.77144 14.8504 7.02191 15.264 7.38755 15.5583C7.75318 15.8526 8.2107 16.009 8.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <div className="logo-circle">
          <span className="logo-text">Hood<br/>Tech</span>
        </div>
      </div>

      {/* Navigation Links Section */}
      <ul className="nav-links">
        <li>
          {/* Points to /about defined in App.jsx */}
          <Link to="/about" className="nav-item">About <ChevronDown /></Link>
        </li>
        <li>
          {/* Points to /services (your PC Builder) defined in App.jsx */}
          <Link to="/services" className="nav-item">Customize Your Own</Link>
        </li>
        <li>
          {/* Placeholders using '#' since we haven't built these yet */}
          <Link to="#" className="nav-item">Shop Now <ChevronDown /></Link>
        </li>
        <li>
          <Link to="#" className="nav-item">Support <ChevronDown /></Link>
        </li>
        <li>
          <Link to="#" className="nav-item">Contact Us <ChevronDown /></Link>
        </li>
      </ul>

      {/* Cart Section */}
      <div className="navbar-cart">
        <Link to="#" className="cart-container">
          <CartIcon />
          <span className="cart-badge">0</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;