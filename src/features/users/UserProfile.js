import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, userAddressDetails, logout } from './userSlice';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const dispatch = useDispatch();

    const { user, address, userDetailsStatus, addressDetailsStatus, error } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);


    useEffect(() => {
        dispatch(userDetails());
        dispatch(userAddressDetails());
    }, [dispatch]);

    const editAddress = () => {
        navigate('/address')
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login', {
            state: { message: 'You have been successfully logged out' }
        });
    };

    if (userDetailsStatus === "pending" && addressDetailsStatus === "pending") return (<div>Loading...</div>)
    if (userDetailsStatus === "error" && addressDetailsStatus === "error") return (<div>Error {error}</div>)
    return (
        < div className="user-profile-container" >
            <div className="user-details">
                <h2>Profile</h2>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <li>Full Name: {address.fullName}</li>
                <li>Phone: {address.phoneNumber}</li>
                <li>Alternate Phone: {address.alternateNumber}</li>
                <li>PIN Code: {address.pinCode}</li>
                <li>City: {address.city}</li>
                <li>State: {address.state}</li>
                <li>House No: {address.houseNo}</li>
                <li>Area: {address.area}</li>
                <button onClick={editAddress}>Edit Address</button>
            </div>
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
        </div >
    );
}

export default UserProfile;