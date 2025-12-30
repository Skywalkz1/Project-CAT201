import { Routes, Route } from 'react-router-dom'
import Navbar from "./NavigationBar.jsx" // Import the Navbar component
import About from "./About.jsx"       // Import the Home page
import Services from './Services.jsx' // Import the Services page

function App() {
  return (
    <>
      {/* 1. NAVBAR sits here so it is visible on ALL pages automatically */}
      <Navbar />

      {/* 2. ROUTES determine what content loads BELOW the navbar */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </>
  )
}

export default App