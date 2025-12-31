import { Routes, Route } from 'react-router-dom'
import Navbar from "./NavigationBar.jsx" 
import About from "./About.jsx"       
import Services from './Services.jsx' 
import ShopLaptop from './ShopLaptop.jsx' 
import Shop from './Shop.jsx' 

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} /> {/* Added Home route to prevent blank page */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/shoplaptop" element={<ShopLaptop />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </>
  )
}

export default App