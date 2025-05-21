import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Delicious Food Delivered To Your Doorstep</h1>
                    <p>Order from your favorite restaurants with just a few clicks</p>
                    <div className="hero-buttons">
                        <Link to="/restaurants" className="btn primary-btn">Order Now</Link>
                        <Link to="/dishes" className="btn secondary-btn">Browse Menu</Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Delicious food" />
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose Us</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🚚</div>
                        <h3>Fast Delivery</h3>
                        <p>Get your food delivered in under 30 minutes or it's free</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🍔</div>
                        <h3>Wide Selection</h3>
                        <p>Choose from 100+ dishes across 15+ restaurants</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💳</div>
                        <h3>Easy Payments</h3>
                        <p>Secure payment options including cash on delivery</p>
                    </div>
                </div>
            </section>

            {/* Popular Dishes Section */}
            <section className="popular-dishes">
                <h2>Popular Dishes</h2>
                <div className="dishes-grid">
                    {["https://images7.alphacoders.com/596/596343.jpg", "https://static.vecteezy.com/system/resources/previews/019/023/604/non_2x/front-view-tasty-meat-burger-with-cheese-and-salad-free-photo.jpg", "https://img.freepik.com/free-photo/gourmet-chicken-biryani-with-steamed-basmati-rice-generated-by-ai_188544-13480.jpg?ga=GA1.1.1880183647.1738560082&semt=ais_hybrid&w=740", "https://images8.alphacoders.com/107/thumb-1920-1072808.jpg"].map((item) => (
                        <div key={item} className="dish-card">
                            <div className="dish-image">
                                <img src={`${item}`} alt={`Dish ${item}`} />
                            </div>
                        </div>
                    ))}
                </div>
                <Link to="/dishes" className="btn view-all-btn">View All Dishes →</Link>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to satisfy your cravings?</h2>
                <p>Download our app for exclusive offers and faster ordering</p>
                <div className="app-buttons">
                    <button className="app-store-btn">App Store</button>
                    <button className="google-play-btn">Google Play</button>
                </div>
                <p>Coming Soon.....</p>
            </section>
        </div>
    );
};

export default Home;