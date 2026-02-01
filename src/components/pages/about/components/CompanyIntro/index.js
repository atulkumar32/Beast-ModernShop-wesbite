'use client';

import './index.scss';

const CompanyIntro = () => {
  return (
    <section className="company-intro section">
      <div className="container">
        <div className="company-intro__content">
          <div className="company-intro__text">
            <h1 className="company-intro__title animate-slide-in-up">
              About ModernShop
            </h1>
            <p className="company-intro__subtitle animate-slide-in-up stagger-1">
              Your trusted partner in online shopping since 2020
            </p>
            <div className="company-intro__description animate-slide-in-up stagger-2">
              <p>
                ModernShop is more than just an eCommerce platform – we're your gateway to a world of quality products, 
                exceptional service, and unbeatable value. Founded with a vision to revolutionize online shopping, 
                we've grown from a small startup to a trusted destination for millions of customers worldwide.
              </p>
              <p>
                Our commitment to excellence drives everything we do. From carefully curating our product selection 
                to ensuring lightning-fast delivery, we're dedicated to making your shopping experience seamless, 
                enjoyable, and rewarding.
              </p>
            </div>
            <div className="company-intro__stats animate-slide-in-up stagger-3">
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="company-intro__image animate-slide-in-right">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"
              alt="Modern office space"
              className="intro-image"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <h3>Innovation Driven</h3>
                <p>Cutting-edge technology meets exceptional service</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;