import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userAddress } from './userSlice';
import { useNavigate } from 'react-router-dom';
import './userAddress.css';

function UserAddress() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bubbles, setBubbles] = useState([]);
    const [user, setUser] = useState({
        fullName: '',
        phoneNumber: '',
        alternateNumber: '',
        pinCode: '',
        city: '',
        state: '',
        houseNo: '',
        area: ''
    });

    useEffect(() => {
        const createBubbles = () => {
            const newBubbles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                size: Math.random() * 30 + 10,
                left: Math.random() * 100,
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 2,
                color: `hsla(${Math.random() * 360}, 70%, 80%, 0.7)`
            }));
            setBubbles(newBubbles);
        };
        createBubbles();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userAddress(user));
        navigate('/profile');
    };

    return (
        <div className="address-container">
            {bubbles.map(bubble => (
                <div
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: `${bubble.left}%`,
                        background: bubble.color,
                        animationDelay: `${bubble.delay}s`,
                        animationDuration: `${bubble.duration}s`
                    }}
                ></div>
            ))}

            <div className="address-content">
                <div className="address-header">
                    <h2>Shipping Address</h2>
                </div>

                <form onSubmit={handleSubmit} className="address-form">
                    <div className="form-grid">
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={user.phoneNumber}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Alternate Number</label>
                            <input
                                type="tel"
                                name="alternateNumber"
                                value={user.alternateNumber}
                                onChange={handleChange}
                                placeholder="Alternative contact"
                                pattern="[0-9]{10}"
                                required
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={user.pinCode}
                                    onChange={handleChange}
                                    placeholder="123456"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={user.city}
                                    onChange={handleChange}
                                    placeholder="Your city"
                                    required
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>State</label>
                            <input
                                type="text"
                                name="state"
                                value={user.state}
                                onChange={handleChange}
                                placeholder="Your state"
                                required
                            />
                        </div>

                        <div className="input-row">
                            <div className="input-group">
                                <label>House/Apartment No.</label>
                                <input
                                    type="text"
                                    name="houseNo"
                                    value={user.houseNo}
                                    onChange={handleChange}
                                    placeholder="Building number"
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Area/Street</label>
                                <input
                                    type="text"
                                    name="area"
                                    value={user.area}
                                    onChange={handleChange}
                                    placeholder="Street name"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserAddress;