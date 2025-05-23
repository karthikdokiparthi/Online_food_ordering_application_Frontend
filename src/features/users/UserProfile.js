import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails, userAddressDetails } from './userSlice';
import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();

    // Correctly access userDetailsStatus from state
    const { user, address, userDetailsStatus, addressDetailsStatus, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(userDetails());
        dispatch(userAddressDetails());
    }, [dispatch]);

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
            </div>
        </div >
    );
}

export default UserProfile;