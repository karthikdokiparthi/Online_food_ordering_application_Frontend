import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
    const navigate = useNavigate();
    const [bubbles, setBubbles] = useState([]);

    useEffect(() => {
        const createBubbles = () => {
            const newBubbles = Array.from({ length: 30 }, (_, i) => ({
                id: i,
                size: Math.random() * 30 + 10,
                left: Math.random() * 100,
                delay: Math.random() * 2,
                duration: Math.random() * 3 + 2,
                color: `hsla(${Math.random() * 360}, 70%, 80%, 0.7)`
            }));
            setBubbles(newBubbles);
        };
        createBubbles();
    }, []);

    const handleOK = () => {
        navigate(-1);
    };

    return (
        <div className="payment-container">
            {bubbles.map(bubble => (
                <div
                    key={bubble.id}
                    className="bubble"
                    style={{
                        width: `${bubble.size}px`,
                        height: `${bubble.size}px`,
                        left: `${bubble.left}%`,
                        background: bubble.color,
                        animationDelay: `${bubble.delay}s`,
                        animationDuration: `${bubble.duration}s`
                    }}
                ></div>
            ))}

            <div className="payment-content">
                <div className="coming-soon-text">
                    <h1>Payment Gateway</h1>
                    <p>🚀 Exciting payment options launching soon!</p>
                    <p>We're preparing something amazing for you</p>
                </div>

                <button
                    className="ok-button"
                    onClick={handleOK}
                >
                    Got It!
                </button>
            </div>
        </div>
    );
}

export default Payment;