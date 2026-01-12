import PropTypes from 'prop-types';

function Card({ profilePic, name = "Insert Name", text = "Insert Text", linkedinUrl = "#" }) {
    
    const imageSrc = profilePic || "https://via.placeholder.com/150";

    return (
        <div className='card'>
            <img className='card-image' src={imageSrc} alt={`${name}'s profile`} />
            <h2 className='card-title'>{name}</h2>
            <p className='card-text'>{text}</p>
            
            
            <div className="card-socials">
                
                {linkedinUrl && (
                    <a 
                        href={linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-icon linkedin"
                    >
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>
                )}
                
            </div>
        </div>
    );
}

Card.propTypes = {
    name: PropTypes.string,
    text: PropTypes.string,
    profilePic: PropTypes.string,
    linkedinUrl: PropTypes.string,
}

export default Card;