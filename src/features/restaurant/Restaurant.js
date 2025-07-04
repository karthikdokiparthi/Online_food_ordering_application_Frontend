import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants, fetchRestaurantDishes } from './restaurantSlice';
import { addToCart } from '../Cart/cartSlice';
import './Restaurant.css';

// Toast Notification Component
const ToastNotification = ({ show, message }) => {
    if (!show) return null;

    return (
        <div className="toast-notification">
            <div className="toast-content">
                <div className="toast-icon">✓</div>
                <div className="toast-message">{message}</div>
            </div>
        </div>
    );
};

function Restaurant() {
    const dispatch = useDispatch();
    const menuSectionRef = useRef(null);
    const [toast, setToast] = useState({ show: false, message: '' });

    const {
        restaurant: restaurants,
        restaurantStatus,
        restaurantDishes,
        restaurantDishesStatus,
        error
    } = useSelector((state) => state.restaurant);

    const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    // Show notification
    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    // Fetch restaurants on mount
    useEffect(() => {
        dispatch(fetchRestaurants());
    }, [dispatch]);

    // Function to fetch dishes
    const fetchRestaurantDishesById = (restaurantId) => {
        dispatch(fetchRestaurantDishes(restaurantId));
        setSelectedRestaurantId(restaurantId);
        const selected = restaurants.find(r => r.id === restaurantId);
        setSelectedRestaurant(selected);

        setTimeout(() => {
            if (menuSectionRef.current) {
                menuSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 50);
    };

    // Handle add to cart with notification
    const handleAddToCart = (dish, e) => {
        e.stopPropagation();
        dispatch(addToCart({ dishId: dish.id, quantity: 1 }));
        showToast(`${dish.name} added to cart successfully!`);
    };

    // Loading/Error states for restaurants
    if (restaurantStatus === 'loading') return <div className="loading-container">Loading...</div>;
    if (restaurantStatus === 'error') return <div className="error-container">Error: {error}</div>;

    return (
        <div className="restaurant-app">
            <ToastNotification show={toast.show} message={toast.message} />

            <header className="app-header">
                <h1>Discover Restaurants</h1>
                <p>Find the best food for you</p>
            </header>

            <section className="restaurant-section">
                <h2 className="section-title">Our Restaurants</h2>
                <div className="restaurant-grid">
                    {restaurants.map((restaurant) => (
                        <div
                            key={restaurant.id}
                            onClick={() => fetchRestaurantDishesById(restaurant.id)}
                            className={`restaurant-card ${selectedRestaurantId === restaurant.id ? 'active' : ''}`}
                        >
                            <div className="restaurant-image-container">
                                <img
                                    src={restaurant.image || 'https://via.placeholder.com/300x200?text=Restaurant'}
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                                <div className="restaurant-overlay">
                                    <span>View Menu</span>
                                </div>
                            </div>
                            <div className="restaurant-details">
                                <h3>{restaurant.name}</h3>
                                <p className="cuisine-type">{restaurant.cuisineType || 'Various cuisines'}</p>
                                <div className="rating">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} className={`star ${i < (restaurant.rating || 4) ? 'filled' : ''}`}>★</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className={`menu-section ${selectedRestaurantId ? 'visible' : 'hidden'}`} ref={menuSectionRef}>
                {selectedRestaurantId && (
                    <>
                        <div className="menu-header">
                            <h2 className="section-menu-title">{selectedRestaurant?.name}'s Menu</h2>
                            <p className="restaurant-description">{selectedRestaurant?.description || 'Delicious dishes waiting for you'}</p>
                        </div>

                        {restaurantDishesStatus === 'loading' ? (
                            <div className="loading-container">Loading dishes...</div>
                        ) : (
                            <div className="menu-grid">
                                {restaurantDishes && restaurantDishes.length > 0 ? (
                                    restaurantDishes.map((dish) => (
                                        <div key={dish.id} className="menu-item">
                                            <div className="menu-item-image">
                                                <img
                                                    src={dish.img || 'https://via.placeholder.com/150x150?text=Dish'}
                                                    alt={dish.name}
                                                />
                                            </div>
                                            <div className="menu-item-details">
                                                <h3>{dish.name}</h3>
                                                <p className="item-description">{dish.description || 'A delicious dish you will love'}</p>
                                                <div className="item-footer">
                                                    <span className="price">${dish.price.toFixed(2)}</span>
                                                    <button
                                                        className="add-to-cart"
                                                        onClick={(e) => handleAddToCart(dish, e)}
                                                    >Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-dishes">No dishes available for this restaurant</p>
                                )}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
}

export default Restaurant;