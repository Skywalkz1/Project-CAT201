import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from "./NavigationBar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";

// Page Components
import Home from './Home';
import About from './About';
import Customize from './Customize.jsx';
import Contact from './Contact';
import Shop from './Shop.jsx';
import Support from './Support.jsx';
import Login from './Login.jsx'; 
import Signup from './Signup.jsx'; 
import ForgotPassword from './ForgotPassword.jsx'; 
import AdminDashboard from './AdminDashboard.jsx';
import Profile from './Profile.jsx';
import Quotation from './Quotation.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quotation" element={<Quotation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;