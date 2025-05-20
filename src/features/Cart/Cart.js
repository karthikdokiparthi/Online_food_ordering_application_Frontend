import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQty, decreaseQty, deleteFromCart } from './cartSlice';
import './Cart.css';

function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const getTotal = () =>
        cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-content">
                        <div className="emoji">🚀</div>
                        <h3 className="empty-cart-title">Your Cart is Empty</h3>
                        <p className="empty-cart-message">
                            Looks like you haven't added anything to your cart yet
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    {cart.map(item => (
                        <div className="cart-item" key={item.name}>
                            <img src={item.img} alt={item.name} className="cart-item-img" />
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                                <p>Qty: {item.quantity}</p>
                                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => dispatch(increaseQty(item))}>
                                    <i className="fas fa-plus"></i> Add
                                </button>
                                <button onClick={() => dispatch(decreaseQty(item))}>
                                    <i className="fas fa-minus"></i> Remove
                                </button>
                                <button onClick={() => dispatch(deleteFromCart(item))}>
                                    <i className="fas fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="cart-total">Grand Total: ₹{getTotal()}</h3>
                </div>
            )}
        </div>
    );
}

export default Cart;
