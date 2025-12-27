import Card from "./Card.jsx"
import Header from "./Header.jsx"
import Footer from "./Footer.jsx"
import profilePic1 from './assets/Syazril.png'
import profilePic2 from './assets/Haris_Zakuwan.jpg'

function App() {

  return (
    <>
    <Header />
    <div className="cards-container">
      <Card linkedinUrl='https://www.linkedin.com/in/s-iman-b72129232/' profilePic={profilePic1} name="Syazril Iman" text="Data Scientist in the Making | Passionate About Analytics, AI, and Business Intelligence"/>
      <Card linkedinUrl='https://www.linkedin.com/in/hrszkwnn/' profilePic={profilePic2} name="Haris Zakuwan" text=" Software Engineer in Progress | Dedicated to Solving Complex Problems through Efficient Algorithms and Design "/>
      <Card />
      <Card />
    </div>
    <Footer />
    </>
  )
}

export default App
