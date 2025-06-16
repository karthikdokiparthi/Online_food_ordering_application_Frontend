import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDetails, userAddressDetails } from '../users/userSlice';
import { fetchCart } from './cartSlice';
import './PlaceOrder.css';

function PlaceOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { address, userDetailsStatus, addressDetailsStatus } = useSelector(
        (state) => state.users
    );
    const { cart: cartData, status: cartStatus } = useSelector((state) => state.cart);
    const isAuthenticated = useSelector(state => state.users.isAuthenticated);

    // Check if address is empty
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
            dispatch(fetchCart());
        }
    }, [dispatch, isAuthenticated]);

    const handlePlaceOrder = async () => {
        try {
            navigate('/order-confirmation');
        } catch (error) {
            console.error('Order placement failed:', error);
        }
    };

    // Loading state
    if (userDetailsStatus === 'pending' || addressDetailsStatus === 'pending' || cartStatus === 'loading') {
        return (
            <div className="loading-overlay">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    // Address missing state
    if (isAddressEmpty(address)) {
        return (
            <div className="place-order-container">
                <div className="order-review-header">
                    <h2>Shipping Address Required</h2>
                </div>
                <div className="address-card">
                    <p>Please add a shipping address to continue with your order.</p>
                    <div className="action-buttons">
                        <button
                            className="confirm-btn"
                            onClick={() => navigate('/address')}
                        >
                            Add Address
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Empty cart state
    if (!cartData?.cartItems?.length) {
        return (
            <div className="place-order-container">
                <div className="order-review-header">
                    <h2>Empty Shopping Cart</h2>
                </div>
                <div className="order-summary-card">
                    <p>Your cart is currently empty.</p>
                    <div className="action-buttons">
                        <button
                            className="confirm-btn"
                            onClick={() => navigate('/menu')}
                        >
                            Browse Menu
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="place-order-container">
            <div className="order-review-header">
                <h2>Review Your Order</h2>
            </div>

            <div className="order-details-grid">
                <div className="address-card">
                    <h3>Delivery Address</h3>
                    <div className="detail-item">
                        <span className="detail-label">Full Name</span>
                        <span className="detail-value">{address.fullName}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Contact Number</span>
                        <span className="detail-value">{address.phoneNumber}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Delivery Address</span>
                        <span className="detail-value">
                            {address.houseNo}, {address.area}<br />
                            {address.city}, {address.state} - {address.pinCode}
                        </span>
                    </div>
                </div>

                <div className="order-summary-card">
                    <h3>Order Summary</h3>
                    {cartData.cartItems.map(item => (
                        <div key={item.id} className="order-item">
                            <div className="item-info">
                                <span className="item-name">{item.dishName}</span>
                                <span className="item-quantity">x{item.quantity}</span>
                            </div>
                            <span className="item-price">
                                ${(item.quantity * item.price).toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className="order-total">
                        <span>Total Amount:</span>
                        <span>${cartData.totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="action-buttons">
                <button
                    className="confirm-btn"
                    onClick={handlePlaceOrder}
                >
                    Confirm & Place Order
                </button>
                <button
                    className="back-btn"
                    onClick={() => navigate('/cart')}
                >
                    Back to Cart
                </button>
            </div>
        </div>
    );
}

export default PlaceOrder;