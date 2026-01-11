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
import ProductDetail from './ProductDetail.jsx';
import Support from './Support.jsx';
import Login from './Login.jsx'; 
import Signup from './Signup.jsx'; 
import ForgotPassword from './ForgotPassword.jsx'; 
import AdminDashboard from './AdminDashboard.jsx';
import AdminQuotationHistory from './AdminQuotationHistory.jsx';
import Profile from './Profile.jsx';
import Quotation from './Quotation.jsx';
import AdminSupportTickets from './AdminSupportTicket.jsx';
import Cart from './Cart.jsx';
import { CartProvider } from './CartContext.jsx';
import Checkout from './Checkout.jsx';
import AdminOrders from './AdminOrders';

function App() {
  return (
    <CartProvider>
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
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/admin/products" element={<AdminDashboard />} />
          <Route path="/admin/quotations" element={<AdminQuotationHistory />} />
          <Route path="/admin/tickets" element={<AdminSupportTickets />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;