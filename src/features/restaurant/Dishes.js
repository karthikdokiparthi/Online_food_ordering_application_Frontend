import React, { useEffect, useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes, fetchDishesByCategory, clearSelectedCategory } from './restaurantSlice';
import { addToCart } from '../Cart/cartSlice';
import MiniDishList from './MiniDishList';
import './Dishes.css';

function Dishes() {
    const [selectedDish, setSelectedDish] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const { dishes, dishStatus, selectedCategory } = useSelector((state) => state.restaurant);

    // Fetch dishes when component mounts or category changes
    useEffect(() => {
        if (selectedCategory) {
            dispatch(fetchDishesByCategory(selectedCategory));
        } else {
            dispatch(fetchAllDishes());
        }
    }, [dispatch, selectedCategory]);

    const renderRating = (rating = 4.5) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} className="star-filled" />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} className="star-half" />);
            } else {
                stars.push(<FaRegStar key={i} className="star-empty" />);
            }
        }
        return stars;
    };

    const handleShowAll = () => {
        dispatch(clearSelectedCategory()); // Clear the category filter
    };

    const openModal = (dishItem) => {
        setSelectedDish(dishItem);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = (e) => {
        if (e.target.classList.contains('modal-image-container')) return;
        setShowModal(false);
        document.body.style.overflow = 'auto';
    };

    if (dishStatus === 'loading') {
        return (
            <div className="dishes-container">
                <div className="loading-spinner"></div>
                <h2 className="loading-message">Discovering Culinary Delights...</h2>
            </div>
        );
    }

    if (dishStatus === 'error') {
        return (
            <div className="dishes-container">
                <h2 className="error-message">Something went wrong while fetching dishes.</h2>
            </div>
        );
    }

    if (dishes.length === 0 && dishStatus === 'succeeded') {
        return (
            <div className="dishes-container">
                <h2 className="no-dishes-message">No dishes found for this category.</h2>
            </div>
        );
    }

    return (
        <div className="dishes-main">
            <MiniDishList />
            <div className="dishes-container">
                <div className="dishes-header">
                    <h2 className="dishes-title">
                        {selectedCategory ? `${selectedCategory} Dishes` : 'Our Culinary Collection'}
                    </h2>
                    {selectedCategory && (
                        <button
                            className="clear-filter-btn"
                            onClick={handleShowAll}
                        >
                            Show All
                        </button>
                    )}
                </div>

                <ul className="dishes-list">
                    {dishes.map((item) => (
                        <li
                            className={`dish-item ${item.featured ? 'featured-dish' : ''}`}
                            key={item.id}
                            onClick={() => openModal(item)}
                        >
                            {item.discount && <span className="dish-badge">{item.discount}% OFF</span>}
                            <div className="dish-image-container">
                                <img src={item.img || '/default-dish.jpg'} alt={item.name} className="dish-image" />
                                <div className="dish-overlay"></div>
                            </div>
                            <div className="dish-content">
                                <h3 className="dish-name">{item.name}</h3>
                                <div className="dish-rating">
                                    {renderRating(item.rating)}
                                    <span className="dish-review-count">({item.reviews || '24'})</span>
                                </div>
                                <div className="dish-price-container">
                                    <span className="dish-price">${item.price.toFixed(2)}</span>
                                    {item.originalPrice && (
                                        <span className="dish-original-price">${item.originalPrice.toFixed(2)}</span>
                                    )}
                                </div>
                                <p className="dish-description">{item.description}</p>
                                <button
                                    className="dish-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(addToCart(item));
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {showModal && selectedDish && (
                    <div className="modal-overlay" onClick={closeModal} role="dialog" aria-labelledby="modal-title">
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal} aria-label="Close Modal">
                                <FaTimes />
                            </button>
                            <div className="modal-image-container">
                                <img
                                    src={selectedDish.img || '/default-dish.jpg'}
                                    alt={selectedDish.name}
                                    className="modal-image"
                                />
                            </div>
                            <div className="modal-details">
                                <div className="modal-header">
                                    <h2 className="modal-title" id="modal-title">{selectedDish.name}</h2>
                                    <div className="modal-rating">
                                        {renderRating(selectedDish.rating)}
                                        <span className="dish-review-count">({selectedDish.reviews || '24'} reviews)</span>
                                    </div>
                                </div>
                                <div className="modal-price-container">
                                    <span className="modal-price">${selectedDish.price.toFixed(2)}</span>
                                    {selectedDish.originalPrice && (
                                        <span className="modal-original-price">${selectedDish.originalPrice.toFixed(2)}</span>
                                    )}
                                    {selectedDish.discount && (
                                        <span className="modal-discount">{selectedDish.discount}% OFF</span>
                                    )}
                                </div>
                                <div className="modal-tags">
                                    {selectedDish.tags?.map(tag => (
                                        <span key={tag} className="modal-tag">{tag}</span>
                                    ))}
                                </div>
                                <p className="modal-description">{selectedDish.description}</p>
                                <div className="modal-footer">
                                    <button
                                        className="modal-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(addToCart(selectedDish));
                                        }}
                                    >
                                        Add to Cart - ${selectedDish.price.toFixed(2)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dishes;