'use client';

import './index.scss';

const MissionVision = () => {
  return (
    <section className="mission-vision section">
      <div className="container">
        <div className="section-title">
          <h2>Our Mission & Vision</h2>
          <p>Driving the future of eCommerce with purpose and innovation</p>
        </div>

        <div className="mission-vision__content">
          <div className="mission-card animate-slide-in-left">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Our Mission</h3>
              <p className="card-description">
                To democratize access to quality products by creating an inclusive, 
                user-friendly platform that connects customers with the best brands 
                and merchants worldwide. We strive to make online shopping accessible, 
                affordable, and enjoyable for everyone.
              </p>
              <ul className="card-features">
                <li>Customer-first approach</li>
                <li>Quality assurance</li>
                <li>Global accessibility</li>
                <li>Sustainable practices</li>
              </ul>
            </div>
          </div>

          <div className="vision-card animate-slide-in-right">
            <div className="card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Our Vision</h3>
              <p className="card-description">
                To become the world's most trusted and innovative eCommerce platform, 
                setting new standards for customer experience, technological advancement, 
                and sustainable business practices. We envision a future where shopping 
                online is seamless, personalized, and environmentally conscious.
              </p>
              <ul className="card-features">
                <li>Global market leadership</li>
                <li>Technological innovation</li>
                <li>Environmental responsibility</li>
                <li>Community empowerment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mission-vision__values">
          <h3 className="values-title">Our Core Values</h3>
          <div className="values-grid">
            <div className="value-item animate-fade-in stagger-1">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                </svg>
              </div>
              <h4>Integrity</h4>
              <p>Honest, transparent, and ethical in all our dealings</p>
            </div>
            <div className="value-item animate-fade-in stagger-2">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h4>Innovation</h4>
              <p>Continuously pushing boundaries to improve experiences</p>
            </div>
            <div className="value-item animate-fade-in stagger-3">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h4>Community</h4>
              <p>Building strong relationships with customers and partners</p>
            </div>
            <div className="value-item animate-fade-in stagger-4">
              <div className="value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h4>Excellence</h4>
              <p>Striving for the highest quality in everything we do</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;