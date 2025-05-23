import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUtensils, FaBars, FaTimes } from 'react-icons/fa';
import { logout } from '../features/users/userSlice';
import './Navbar.css';
import { useDispatch } from 'react-redux';
import { isTokenExpired } from '../utils/token';
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [logoutMessage, setLogoutMessage] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                            onClick={closeMobileMenu}
                        >
                            <p className='icon'><AiOutlineShoppingCart /></p>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/profile"
                            onClick={closeMobileMenu}
                        >
                            <p className='icon'><CgProfile /></p>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;