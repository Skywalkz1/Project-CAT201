import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from "./NavigationBar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx"; // Import the helper

// Page Components
import Home from './Home';
import About from './About';
import Customize from './Customize.jsx';
import Contact from './Contact';
import Shop from './Shop.jsx';
import Support from './Support.jsx';

function App() {
  return (
    <Router>
      {/* This ensures every time you switch pages, the window scrolls to top */}
      <ScrollToTop />
      
      <div className="app-container">
        {/* Navigation Bar (Always Visible) */}
        <Navbar />

        {/* Routes Switcher */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer (Always Visible) */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;