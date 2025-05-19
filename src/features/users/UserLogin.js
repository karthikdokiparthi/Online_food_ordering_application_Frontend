import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { userLogin } from './userSlice';
import { isTokenExpired } from '../utils/Token';
import './UserLogin.css';

function UserLogin() {
    const [user, setUser] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Clear existing tokens and messages on mount
        localStorage.removeItem('token');
        setMessage(null);

        // Handle both query parameters and state messages
        const queryParams = new URLSearchParams(location.search);
        const stateMessage = location.state?.message;
        const sessionExpired = queryParams.get('session_expired');

        if (stateMessage) {
            setMessage({
                type: 'success',
                text: stateMessage
            });
        } else if (sessionExpired) {
            setMessage({
                type: 'error',
                text: 'Your session has expired. Please login again.'
            });
        }
    }, [location]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            navigate(location.state?.from || '/home');
        }
    }, [navigate, location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(userLogin(user)).unwrap();
            localStorage.setItem('token', result.token);

            // Redirect to previous location or home
            navigate(location.state?.from || '/home', {
                state: { message: null } // Clear any previous state
            });

        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Login failed. Please check your credentials.'
            });
        }
    };

    return (
        <div className="login-container">
            <div className="branding-side">
                <div className="branding-content">
                    <h1 className="app-name">QuickBite</h1>
                    <p className="tagline">Savor the Moment, Delivered Fast</p>
                    <div className="food-illustration">
                        <div className="burger-icon">🍔</div>
                        <div className="pizza-icon">🍕</div>
                        <div className="taco-icon">🌮</div>
                    </div>
                </div>
            </div>

            <div className="form-side">
                <div className="form-container">
                    {message && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <h2>Welcome Back!</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>

                    <p className="signup-link">
                        New to QuickBite?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && navigate('/register')}
                        >
                            Create account
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;