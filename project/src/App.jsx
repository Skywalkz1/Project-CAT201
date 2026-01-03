import { Routes, Route } from 'react-router-dom'
import Navbar from "./NavigationBar.jsx" // Import the Navbar component
import About from "./About.jsx"       // Import the Home page
import Services from './Services.jsx' // Import the Services page
import OurLocations from './OurLocations.jsx' // Import the Contact Us page
import ShopLaptop from './ShopLaptop.jsx' 
import Support from './Support.jsx'
import Footer from './Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shoplaptop" element={<ShopLaptop />} />
        <Route path="/ContactUs" element={<OurLocations />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App