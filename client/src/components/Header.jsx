import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user } = useAuth();

    return (
        <header className="site-header">
            <div className="header-content">
                <Link to="/" className="logo">
                    🏓 Pickle Guide Cebu
                </Link>
                
                <nav className="header-nav">
                    <a href="#venues" className="nav-link">Venues</a>
                    {user ? (
                        <Link to="/admin" className="nav-link nav-admin">
                            Dashboard
                        </Link>
                    ) : (
                        <Link to="/login" className="nav-link nav-login">
                            Admin Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
