'use client';

import './index.scss';

const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"></path>
          <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
          <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
        </svg>
      ),
      title: 'Quality Guarantee',
      description: 'Every product is carefully vetted and comes with our quality assurance promise.',
      highlight: '100% Authentic'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: 'Fast Shipping',
      description: 'Lightning-fast delivery with real-time tracking and secure packaging.',
      highlight: 'Free on $50+'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: '24/7 Support',
      description: 'Round-the-clock customer service with expert assistance whenever you need it.',
      highlight: 'Always Available'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9,22 9,12 15,12 15,22"></polyline>
        </svg>
      ),
      title: 'Easy Returns',
      description: 'Hassle-free returns and exchanges with our 30-day money-back guarantee.',
      highlight: '30-Day Policy'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16,8 20,8 23,11 23,16 16,16 16,8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security and fraud protection.',
      highlight: 'SSL Encrypted'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: 'Loyalty Rewards',
      description: 'Earn points with every purchase and unlock exclusive discounts and perks.',
      highlight: 'Earn & Save'
    }
  ];

  return (
    <section className="why-choose-us section">
      <div className="container">
        <div className="section-title">
          <h2>Why Choose ModernShop?</h2>
          <p>Discover what makes us the preferred choice for millions of customers</p>
        </div>

        <div className="why-choose-us__grid">
          {features.map((feature, index) => (
            <div key={index} className={`feature-card animate-scale-in stagger-${(index % 3) + 1}`}>
              <div className="feature-card__icon">
                {feature.icon}
              </div>
              <div className="feature-card__content">
                <div className="feature-card__header">
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <span className="feature-card__highlight">{feature.highlight}</span>
                </div>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="why-choose-us__cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Experience the Difference?</h3>
            <p className="cta-description">
              Join millions of satisfied customers who trust ModernShop for their online shopping needs.
            </p>
            <div className="cta-actions">
              <a href="/products" className="btn btn-primary">Start Shopping</a>
              <a href="/contact" className="btn btn-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;