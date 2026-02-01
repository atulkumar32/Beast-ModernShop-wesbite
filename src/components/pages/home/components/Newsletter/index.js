'use client';

import { useState } from 'react';
import './index.scss';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1000);
  };

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter__content">
          <div className="newsletter__text">
            <h2 className="newsletter__title">Stay in the Loop</h2>
            <p className="newsletter__description">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive deals, and special offers. Join thousands of satisfied customers!
            </p>
            
            <div className="newsletter__benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <span>Exclusive deals & discounts</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </div>
                <span>Early access to new products</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span>Weekly style & trend updates</span>
              </div>
            </div>
          </div>

          <div className="newsletter__form-container">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="newsletter__form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter__input"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className={`newsletter__btn ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="loading-spinner">
                        <div className="spinner"></div>
                      </div>
                    ) : (
                      <>
                        Subscribe
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12,5 19,12 12,19"></polyline>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
                <p className="newsletter__privacy">
                  By subscribing, you agree to our{' '}
                  <a href="/privacy" className="privacy-link">Privacy Policy</a>{' '}
                  and consent to receive updates from our company.
                </p>
              </form>
            ) : (
              <div className="newsletter__success">
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h3 className="success-title">Thank You!</h3>
                <p className="success-message">
                  You've successfully subscribed to our newsletter. 
                  Check your inbox for a welcome email with exclusive offers!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Social Proof */}
        <div className="newsletter__social-proof">
          <div className="social-proof-item">
            <div className="proof-avatars">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40" alt="Customer" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40" alt="Customer" />
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40" alt="Customer" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40" alt="Customer" />
              <div className="proof-count">+25K</div>
            </div>
            <p className="proof-text">Join 25,000+ subscribers</p>
          </div>
          
          <div className="social-proof-item">
            <div className="proof-rating">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
              <span className="rating-text">4.9/5</span>
            </div>
            <p className="proof-text">Rated by our customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;