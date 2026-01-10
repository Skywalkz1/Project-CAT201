import React from 'react';
import Header from './Header'; // This contains your "About Us" text
import Card from './Card';

// Images
import profilePic1 from './assets/Syazril.png';
import profilePic2 from './assets/Haris_Zakuwan.jpg';
import profilePic3 from './assets/AqilAsyraf.jpeg';
import profilePic4 from './assets/Yusri.jpg';

function About() {
  return (
    <>
      <Header />
      
      <div id="team" style={{ padding: '2rem 0' }}>
        <h2 className='team-h2' style={{ textAlign: 'center' }}>Meet The Team</h2>
        <div className="cards-container">
          <Card 
            linkedinUrl='https://www.linkedin.com/in/s-iman-b72129232/' 
            profilePic={profilePic1} 
            name="Syazril Iman" 
            text="Chief Builder & Modder | Passionate about pushing hardware limits. Specializes in custom water loops, case modding, and ultimate gaming rigs."
          />
          <Card 
            linkedinUrl='https://www.linkedin.com/in/hrszkwnn/' 
            profilePic={profilePic2} 
            name="Haris Zakuwan" 
            text="Hardware & OC Specialist | Expert in squeezing every drop of performance. Focuses on safe overclocking, BIOS tuning, and hardware optimization."
          />
          <Card 
            linkedinUrl='https://my.linkedin.com/in/aqil-asyraf-93959618a' 
            profilePic={profilePic3} 
            name="Aqil Asyraf" 
            text="Build Aesthetics Lead | believes a PC should look as good as it performs. Specializes in color coordination, RGB ecosystems, and clean setups."
          />
          <Card 
            linkedinUrl='https://www.linkedin.com/in/khairul-yusri-68167b1a7/' 
            profilePic={profilePic4} 
            name="Khairul Yusri" 
            text="System Performance Analyst | Obsessed with framerates and thermals. Ensures your rig runs cool and quiet under the heaviest gaming loads."
          />
        </div>
      </div>
    </>
  );
}

export default About;