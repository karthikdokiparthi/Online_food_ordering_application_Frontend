import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCart,
    updateCart,
    removeCartItem,
    clearCart
} from './cartSlice';
import './Cart.css';

const Cart = () => {
    const dispatch = useDispatch();
    const { cart: cartData, status, error } = useSelector((state) => state.cart);
    const [localLoading, setLocalLoading] = React.useState(null);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQuantityChange = async (cartItemId, currentQuantity, increment) => {
        const newQuantity = increment ? currentQuantity + 1 : currentQuantity - 1;
        if (newQuantity > 0) {
            setLocalLoading(cartItemId);
            try {
                await dispatch(updateCart({ cartItemId, quantity: newQuantity })).unwrap();
            } catch (error) {
                console.log(error);
            } finally {
                setLocalLoading(null);
            }
        }
    };

    const handleRemove = async (cartItemId) => {
        setLocalLoading(cartItemId);
        try {
            await dispatch(removeCartItem(cartItemId)).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClear = async () => {
        setLocalLoading('clear');
        try {
            await dispatch(clearCart()).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    if (status === 'loading' && !localLoading) return <div>Loading cart...</div>;
    if (status === 'error') return <div>Error: {error}</div>;

    const cartItems = cartData?.cartItems || [];
    const totalPrice = cartData?.totalPrice || 0;

    return (
        <div className="cart-container">
            <h1 className="cart-title">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty</p>
            ) : (
                <>
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.dishImage}
                                    alt={item.dishName}
                                />
                                <div className="cart-item-details">
                                    <h3>{item.dishName}</h3>
                                    <p>${item.price.toFixed(2)} each</p>
                                    <div className="quantity-controls">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(item.id, item.quantity, false)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(item.id, item.quantity, true)}
                                        >
                                            +
                                        </button>
                                        <span style={{ marginLeft: '12px' }}>
                                            ${(item.quantity * item.price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="cart-remove-btn"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-footer">
                        <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>
                        <button
                            type="button"
                            className="cart-clear-btn"
                            onClick={handleClear}
                        >
                            Clear
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
