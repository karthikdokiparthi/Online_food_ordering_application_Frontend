import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from './userSlice';
import './UserRegistration.css';

function UserRegistration() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
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

        const { confirmPassword, ...userData } = user;

        try {
            await dispatch(userRegistration(userData)).unwrap();
            setMessage({ type: 'success', text: "Registration successful! Redirecting..." });

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            const errorMessage = error.message || "Registration failed. Please try again.";
            setMessage({ type: 'error', text: errorMessage });
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
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChange}
                                placeholder="Enter your first name"
                                autoComplete="given-name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChange}
                                placeholder="Enter your last name"
                                autoComplete="family-name"
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
                                autoComplete="email"
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
                                autoComplete="new-password"
                                minLength="8"
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
                                autoComplete="new-password"
                                minLength="8"
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