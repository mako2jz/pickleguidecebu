const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <h3>🏓 Pickle Guide Cebu</h3>
                        <p>Your Central Guide to Pickleball Court Rentals in Cebu</p>
                    </div>
                    
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#venues">Find Venues</a></li>
                            <li><a href="#venues">Submit a Venue</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Pickle Guide Cebu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
