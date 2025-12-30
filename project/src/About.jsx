import Card from "./Card.jsx"
import Footer from "./Footer.jsx"
import Header from "./Header.jsx"
import profilePic1 from './assets/Syazril.png'
import profilePic2 from './assets/Haris_Zakuwan.jpg'
import profilePic3 from './assets/AqilAsyraf.jpeg'
import profilePic4 from './assets/Yusri.jpg'

function About() {
  return (
    <>
      <Header />
      <div className="cards-container">
        <Card linkedinUrl='https://www.linkedin.com/in/s-iman-b72129232/' profilePic={profilePic1} name="Syazril Iman" text="Data Scientist in the Making | Passionate About Analytics, AI, and Business Intelligence"/>
        <Card linkedinUrl='https://www.linkedin.com/in/hrszkwnn/' profilePic={profilePic2} name="Haris Zakuwan" text="Software Engineer in Progress | Dedicated to Solving Complex Problems through Efficient Algorithms and Design"/>
        <Card linkedinUrl='https://my.linkedin.com/in/aqil-asyraf-93959618a' profilePic={profilePic3} name="Aqil Asyraf" text="Software Engineer in Progress | Passionate About Web Development and Problem Solving"/>
        <Card linkedinUrl="https://www.linkedin.com/in/khairul-yusri-68167b1a7/" profilePic={profilePic4} name="Yusri" text="IT Manager | Learn to be better"/>
      </div>
      <Footer />
    </>
  )
}

export default About