function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">
                &copy; {new Date().getFullYear()} <span className="brand-name">HOODTECH PC Sdn Bhd</span>. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;