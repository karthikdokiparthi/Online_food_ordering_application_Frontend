// UserRegistration.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from './userSlice';
import './UserRegistration.css';

function UserRegistration() {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setMessage({ type: 'error', text: "Passwords do not match!" });
            return;
        }

        try {
            await dispatch(userRegistration(user)).unwrap();
            setMessage({ type: 'success', text: "Registration successful! Redirecting..." });

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            setMessage({ type: 'error', text: "Registration failed. Please try again." });
        }
    };

    return (
        <div className="registration-container">
            {/* Left Side - Registration Form */}
            <div className="form-side">
                <div className="form-container">
                    {message && <div className={`alert ${message.type}`}>{message.text}</div>}

                    <h2>Create Account</h2>
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
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
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
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="register-btn">
                            Create Account
                        </button>
                    </form>

                    <p className="login-link">
                        Already have an account?{' '}
                        <span onClick={() => navigate('/login')}>Sign in</span>
                    </p>
                </div>
            </div>

            {/* Right Side - Branding */}
            <div className="branding-side">
                <div className="branding-content">
                    <h1 className="app-name">QuickBite</h1>
                    <p className="tagline">Your Instant Food Delivery Solution</p>
                    <div className="feature-list">
                        <p className="feature-item">🚚 Lightning-fast delivery</p>
                        <p className="feature-item">🍔 100+ Restaurant Partners</p>
                        <p className="feature-item">⭐ 4.9/5 Customer Rating</p>
                    </div>
                    <div className="food-illustration">
                        <div className="sushi-icon">🍣</div>
                        <div className="salad-icon">🥗</div>
                        <div className="juice-icon">🥤</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserRegistration;