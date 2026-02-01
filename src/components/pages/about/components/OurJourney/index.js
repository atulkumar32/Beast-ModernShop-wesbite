'use client';

import './index.scss';

const OurJourney = () => {
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'ModernShop was founded with a vision to revolutionize online shopping.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
        </svg>
      )
    },
    {
      year: '2021',
      title: 'First Million',
      description: 'Reached our first million customers and expanded to 10 countries.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      year: '2022',
      title: 'Mobile Revolution',
      description: 'Launched our award-winning mobile app with AI-powered recommendations.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
      )
    },
    {
      year: '2023',
      title: 'Sustainability Focus',
      description: 'Introduced carbon-neutral shipping and eco-friendly packaging initiatives.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      )
    },
    {
      year: '2024',
      title: 'Global Expansion',
      description: 'Expanded to 50+ countries with localized experiences and same-day delivery.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    },
    {
      year: '2025',
      title: 'Future Vision',
      description: 'Pioneering AR shopping experiences and sustainable commerce solutions.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )
    }
  ];

  return (
    <section className="our-journey section">
      <div className="container">
        <div className="section-title">
          <h2>Our Journey</h2>
          <p>From startup to global leader - the ModernShop story</p>
        </div>

        <div className="journey-timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className={`timeline-item animate-slide-in-up stagger-${(index % 3) + 1}`}>
              <div className="timeline-marker">
                <div className="marker-icon">
                  {milestone.icon}
                </div>
                <div className="marker-line"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{milestone.year}</div>
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="journey-stats">
          <div className="stats-grid">
            <div className="stat-card animate-scale-in stagger-1">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-card animate-scale-in stagger-2">
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-card animate-scale-in stagger-3">
              <div className="stat-number">1M+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card animate-scale-in stagger-4">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Products Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;