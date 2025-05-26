import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userAddress } from './userSlice';
import './userAddress.css'
import { useNavigate } from 'react-router-dom';

function UserAddress() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: '',
        phoneNumber: '',
        alternateNumber: '',
        pinCode: '',
        city: '',
        state: '',
        houseNo: '',
        area: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser, [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userAddress(user));
        navigate('/profile')
    }

    return (
        <div className="user-address__container">
            <div className="user-address__card">
                <h2 className="user-address__title">Shipping Address</h2>
                <form onSubmit={handleSubmit} className="user-address__form">
                    <div className=".user-address__input-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={user.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                        />
                    </div>

                    <div className="user-address__input-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            autoComplete="tel"
                            pattern="[0-9]{10}"
                            required
                        />
                    </div>

                    <div className="user-address__input-group">
                        <label htmlFor="alternateNumber">Alternate Number (Optional)</label>
                        <input
                            type="tel"
                            id="alternateNumber"
                            name="alternateNumber"
                            value={user.alternateNumber}
                            onChange={handleChange}
                            placeholder="Enter alternate number"
                            autoComplete="tel"
                            pattern="[0-9]{10}"
                        />
                    </div>

                    <div className="user-address__input-row">
                        <div className="input-group">
                            <label htmlFor="pincode">Pincode</label>
                            <input
                                type="text"
                                id="pincode"
                                name="pinCode"
                                value={user.pinCode}
                                onChange={handleChange}
                                placeholder="Enter pincode"
                                autoComplete="postal-code"
                                required
                            />
                        </div>

                        <div className="user-address__input-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={user.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                                autoComplete="address-level2"
                                required
                            />
                        </div>
                    </div>

                    <div className="user-address__input-group">
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={user.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            autoComplete="address-level1"
                            required
                        />
                    </div>

                    <div className="user-address__input-row">
                        <div className="input-group">
                            <label htmlFor="homeNo">House/Apartment No.</label>
                            <input
                                type="text"
                                id="houseNo"
                                name="houseNo"
                                value={user.houseNo}
                                onChange={handleChange}
                                placeholder="Enter house/apartment number"
                                autoComplete="address-line1"
                                required
                            />
                        </div>

                        <div className="user-address__input-group">
                            <label htmlFor="area">Area/Street</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                value={user.area}
                                onChange={handleChange}
                                placeholder="Enter area/street"
                                autoComplete="address-line2"
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="user-address__submit-btn" >
                        Save Address
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserAddress;
