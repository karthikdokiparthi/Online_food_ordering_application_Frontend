import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, userAddressDetails, logout } from './userSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserProfile.css';
import { FiEdit, FiLogOut, FiX } from 'react-icons/fi';

function UserProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // Get user data without empty object default
    const {
        user = { username: '', email: '' },
        address,  // No default here
        userDetailsStatus = 'idle',
        addressDetailsStatus = 'idle',
        error = null
    } = useSelector((state) => state.users);

    const isAuthenticated = useSelector(state => state.users.isAuthenticated);

    // Helper function to check for empty address
    const isAddressEmpty = (addr) => {
        if (!addr) return true;
        return !(
            addr.fullName ||
            addr.phoneNumber ||
            addr.houseNo ||
            addr.area ||
            addr.city ||
            addr.state ||
            addr.pinCode
        );
    };

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(userDetails());
            dispatch(userAddressDetails());
        }
    }, [dispatch, isAuthenticated]);

    const handleClose = () => {
        navigate(location.state?.background || '/home');
    };

    const editAddress = () => {
        navigate('/address');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login', {
            state: { message: 'You have been successfully logged out' }
        });
    };

    const [bubbles, setBubbles] = useState([]);

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

    // Loading state
    if (userDetailsStatus === "pending" || addressDetailsStatus === "pending") {
        return (
            <div className="profile-overlay loading">
                <div className="spinner"></div>
            </div>
        );
    }

    // Error state
    if (userDetailsStatus === "error" || addressDetailsStatus === "error") {
        return (
            <div className="profile-overlay error">
                <p>⚠️ Error: {error?.message || 'Failed to load profile data'}</p>
                <button className="retry-btn" onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="profile-container">
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

            <div className="profile-content">
                <div className="profile-header">
                    <h2>Profile Details</h2>
                    <button
                        className="close-btn"
                        onClick={handleClose}
                        aria-label="Close profile"
                    >
                        <FiX />
                    </button>
                </div>
                <div className="profile-body">
                    <div className="detail-item">
                        <span className="detail-label">Username:</span>
                        <span className="detail-value">
                            {user?.username || 'Not available'}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Email:</span>
                        <span className="detail-value">
                            {user?.email || 'Not available'}
                        </span>
                    </div>

                    <div className="address-section">
                        <h3>Shipping Address</h3>
                        {isAddressEmpty(address) ? (
                            <p className="no-address">No shipping address found</p>
                        ) : (
                            <>
                                <div className="detail-item">
                                    <span className="detail-label">Full Name:</span>
                                    <span className="detail-value">
                                        {address.fullName || '-'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Phone:</span>
                                    <span className="detail-value">
                                        {address.phoneNumber || '-'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Alt. Phone:</span>
                                    <span className="detail-value">
                                        {address.alternateNumber || '-'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Address:</span>
                                    <span className="detail-value">
                                        {[address.houseNo, address.area]
                                            .filter(Boolean)
                                            .join(', ') || 'Not specified'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">City:</span>
                                    <span className="detail-value">
                                        {address.city || '-'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">State:</span>
                                    <span className="detail-value">
                                        {address.state || '-'}
                                    </span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">PIN Code:</span>
                                    <span className="detail-value">
                                        {address.pinCode || '-'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="profile-footer">
                    <button
                        className="profile-btn edit-btn"
                        onClick={editAddress}
                    >
                        <FiEdit /> Edit Address
                    </button>
                    <button
                        className="profile-btn logout-btn"
                        onClick={handleLogout}
                    >
                        <FiLogOut /> Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;