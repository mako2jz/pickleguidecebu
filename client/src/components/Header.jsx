import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../resources/pickleheaderlogo.svg';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="w-full bg-[#FAF9F6] shadow-sm">
            <div className="w-full flex items-center justify-between px-4 py-2">
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="Pickle Guide Cebu" className="h-20 w-auto" />
                </Link>
                
                <nav className="flex items-center gap-6 text-[#5C6657]">
                    <a href="#venues" className="font-medium hover:text-[#4F584B]">Venues</a>
                    {user ? (
                        <Link to="/admin" className="font-medium hover:text-[#4F584B]">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="font-medium hover:text-[#4F584B]">
                            Admin Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;