import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { logout } from '../features/users/userSlice';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/token';

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);

    const handleAutoLogout = useCallback(() => {
        setLogoutMessage('Your session has expired. Please login again.');

        // Delay the actual logout and redirect
        const timer = setTimeout(() => {
            localStorage.removeItem('token');
            dispatch(logout());
            navigate('/login');
            setLogoutMessage(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [dispatch, navigate]);

    useEffect(() => {
        const validateToken = () => {
            const token = localStorage.getItem('token');
            if (token && isTokenExpired(token)) {
                handleAutoLogout();
            }
        };

        validateToken();
        const interval = setInterval(validateToken, 60000);
        return () => {
            clearInterval(interval);
        };
    }, [handleAutoLogout]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login', {
            state: { message: 'You have been successfully logged out' }
        });
        closeMobileMenu();
    };

    const isActive = (path) => location.pathname === path;

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className={`nav-container ${scrolled ? 'scrolled' : ''}`}>
            {/* Message Display */}
            {logoutMessage && (
                <div className="navbar-message error">
                    {logoutMessage}
                </div>
            )}

            <div className="nav-content">
                <Link to="/home" className="nav-logo" onClick={closeMobileMenu}>
                    <FaUtensils className="nav-logo-icon" />
                    <span>QuickBite</span>
                </Link>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                <ul className={`nav-list ${mobileMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link
                            to="/home"
                            className={`nav-link ${isActive('/home') ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/restaurants"
                            className={`nav-link ${isActive('/restaurants') ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Restaurants
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/dishes"
                            className={`nav-link ${isActive('/dishes') ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Dishes
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/cart"
                            className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Cart
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/address"
                            className={`nav-link ${isActive('/address') ? 'active' : ''}`}
                            onClick={closeMobileMenu}
                        >
                            Address
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li className="nav-item">
                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                                aria-label="Logout"
                            >
                                <span>Logout</span>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;