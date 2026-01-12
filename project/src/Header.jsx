import headerBg from './assets/image_3a7561.jpg'; 
import partnersBg from './assets/image_3b569b.png';

function Header() {
    return (
        <>
            
            <header className="header-banner" style={{ backgroundImage: `url(${headerBg})` }}>
                <div className="header-overlay">
                    <h1 className="header-title">ABOUT US</h1>
                </div>
            </header>
            
            
            <div className="partners-section">
                <img 
                    src={partnersBg} 
                    alt="Partners: Intel, AMD, Nvidia, G.Skill, Antec, etc." 
                    className="partners-image" 
                />
            </div>

            
            <div className="about-section">
                <p className="about-text">
                    Established on July 5th, 2019 in Malaysia, HOOD IT TRADING started as a company that dealt with selling and distributing gadgets, GPS devices and computer parts. We slowly got hooked on computers and overclocking, which led us to the development of custom gaming systems that would meet the special needs of the avid gamers. Following a strategic business transformation, we evolved into HOODTECH PC Sdn. Bhd. on March 11th, 2022. To date, we have forged strong partnerships with over 20 companies, assembled and supplied more than 100,167+ (up to June 2024) PCs throughout Malaysia, and opened branch in Penang.
                </p>
            </div>

            
            <div className="mission-section">
                <h2 className="mission-title">OUR MISSION</h2>
                <p className="mission-text">
                    We are a passionate group of hardcore gamers and overclockers at heart with a strong passion to computers and the quest of high-performance and customized PCs. We provide professional consultation services to every one of our clients, using our vast knowledge in the field, ensuring the highest quality of products and unmatched service as part of our uncompromising dedication to the satisfaction of our clients.
                </p>
            </div>
        </>
    );
}

export default Header;