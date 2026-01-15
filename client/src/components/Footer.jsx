import { Link } from 'react-router-dom';
import logo from '../resources/picklefooterlogo.svg';

const Footer = () => {
    return (
        <footer className="w-full bg-[#DCCFC0] shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="Pickle Guide Cebu" className="h-24 w-auto" />
                    </Link>
                    
                    <div className="flex flex-col text-[#5C6657]">
                        <a href="#venues" className="font-medium hover:underline">Find Venues</a>
                        <a href="#hero" className="font-medium hover:underline">Submit a Venue</a>
                        <a href="#faq" className="font-medium hover:underline">FAQ</a>
                    </div>
                </div>
                
                <div className="text-center text-[#5C6657]">
                    <p>&copy; {new Date().getFullYear()} Pickle Guide Cebu. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
