import { Routes, Route } from 'react-router-dom'
import Navbar from "./NavigationBar.jsx" // Import the Navbar component
import Home from "./Home.jsx"       // Import the Home page
import Services from './services.jsx' // Import the Services page
import Header from "./Header.jsx"   // This is your About Us content
import Footer from "./Footer.jsx"

// We create a simple wrapper for the About Page 
// because your "Header.jsx" actually holds the About Us content.
function AboutPage() {
  return (
    <>
      <Header />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      {/* 1. NAVBAR sits here so it is visible on ALL pages automatically */}
      <Navbar />

      {/* 2. ROUTES determine what content loads BELOW the navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  )
}

export default App