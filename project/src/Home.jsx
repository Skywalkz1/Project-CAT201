import Card from "./Card.jsx"
import Footer from "./Footer.jsx"
import profilePic1 from './assets/Syazril.png'
import profilePic2 from './assets/Haris_Zakuwan.jpg'
import profilePic3 from './assets/AqilAsyraf.jpeg'
import profilePic4 from './assets/Yusri.jpg'

function Home() {
  return (
    <>
      
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'white' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to HoodTech PC</h1>
        <p style={{ color: '#94a3b8' }}>Your trusted partner for custom gaming PCs and computer components.</p>
      </div>

      <div className="cards-container">
        <Card linkedinUrl='https://www.linkedin.com/in/s-iman-b72129232/' profilePic={profilePic1} name="Syazril Iman" text="Data Scientist in the Making | Passionate About Analytics, AI, and Business Intelligence"/>
        <Card linkedinUrl='https://www.linkedin.com/in/hrszkwnn/' profilePic={profilePic2} name="Haris Zakuwan" text="Software Engineer in Progress | Dedicated to Solving Complex Problems through Efficient Algorithms and Design"/>
        <Card linkedinUrl='https://my.linkedin.com/in/aqil-asyraf-93959618a' profilePic={profilePic3} name="Aqil Asyraf" text="Software Engineer in Progress | Passionate About Web Development and Problem Solving"/>
        <Card linkedinUrl="https://www.linkedin.com/in/yusri-ahmad-705889241/" profilePic={profilePic4} name="Yusri" text="IT Manager | Learn to be better"/>
      </div>
      <Footer />
    </>
  )
}

export default Home