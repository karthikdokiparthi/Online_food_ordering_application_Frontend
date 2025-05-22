import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userDetails } from './userSlice';
import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();

    // Correctly access userDetailsStatus from state
    const { user, userDetailsStatus: status, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(userDetails());
    }, [dispatch]);

    return (
        <div className="user-profile-container">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'success' && user && (
                <div className="user-details">
                    <h2>Profile</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
}

export default UserProfile;