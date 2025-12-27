// 1. Import the existing images
import headerBg from './assets/image_3a7561.jpg'; 

// 2. Import the new partners image
import partnersBg from './assets/image_3b569b.png';

function Header() {
    return (
        <>
            {/* HERO BANNER */}
            <header className="header-banner" style={{ backgroundImage: `url(${headerBg})` }}>
                <div className="header-overlay">
                    <h1 className="header-title">ABOUT US</h1>
                </div>
            </header>
            
            {/* PARTNERS SECTION */}
            <div className="partners-section">
                <img 
                    src={partnersBg} 
                    alt="Partners: Intel, AMD, Nvidia, G.Skill, Antec, etc." 
                    className="partners-image" 
                />
            </div>

            {/* ABOUT TEXT SECTION */}
            <div className="about-section">
                <p className="about-text">
                    Established on July 5th, 2019 in Malaysia, HOOD IT TRADING began as a company specializing in the sale and distribution of gadgets, GPS devices, and computer components. Our enthusiasm for computers and overclocking gradually intensified, propelling us towards creating custom gaming systems tailored to the unique requirements of avid gamers. Following a strategic business transformation, we evolved into HOODTECH PC Sdn. Bhd. on March 11th, 2022. To date, we have forged strong partnerships with over 20 companies, assembled and supplied more than 110,509+ (up to June 2024) PCs throughout Malaysia, and extended our reach with five branches in Kuala Lumpur, SS2 Petaling Jaya, Setia Alam, Johor Bahru and Penang.
                </p>
            </div>

            {/* MISSION SECTION */}
            <div className="mission-section">
                <h2 className="mission-title">OUR MISSION</h2>
                <p className="mission-text">
                    At our core, we are a dedicated team of avid gamers and overclocking enthusiasts with a deep-rooted passion for computers and the pursuit of high-performance, personalized PCs. Leveraging our extensive expertise in the field, we deliver professional consultation services to each of our clients, guaranteeing top-quality products and unparalleled service as an integral aspect of our unwavering commitment to their satisfaction.
                </p>
            </div>
        </>
    );
}

export default Header;