'use client';

import './index.scss';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: '📍',
      title: 'Address',
      details: [
        'India',
        'Available for remote work',
        'Open to relocation'
      ]
    },
    {
      icon: '📞',
      title: 'Phone',
      details: [
        '+91 8057196070',
        'Available 9 AM - 9 PM IST'
      ]
    },
    {
      icon: '📧',
      title: 'Email',
      details: [
        'pradipmourya172@gmail.com',
        'Response within 24 hours'
      ]
    },
    {
      icon: '🕒',
      title: 'Availability',
      details: [
        'Monday - Friday: 9:00 AM - 9:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: 11:00 AM - 5:00 PM',
        'IST (Indian Standard Time)'
      ]
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: '📘',
      url: 'https://facebook.com/modernshop',
      color: '#1877f2'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/modernshop',
      color: '#1da1f2'
    },
    {
      name: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/modernshop',
      color: '#e4405f'
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/modernshop',
      color: '#0077b5'
    }
  ];

  return (
    <div className="contact-info">
      <div className="contact-info-header">
        <h2>Get in Touch</h2>
        <p>We're here to help and answer any questions you might have.</p>
      </div>

      <div className="contact-details">
        {contactDetails.map((detail, index) => (
          <div key={index} className="contact-detail">
            <div className="contact-detail-icon">
              {detail.icon}
            </div>
            <div className="contact-detail-content">
              <h3>{detail.title}</h3>
              <div className="contact-detail-info">
                {detail.details.map((info, infoIndex) => (
                  <p key={infoIndex}>{info}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="social-links">
        <h3>Follow Us</h3>
        <div className="social-links-grid">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              style={{ '--social-color': social.color }}
            >
              <span className="social-icon">{social.icon}</span>
              <span className="social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <div className="quick-action">
            <div className="quick-action-icon">📦</div>
            <div className="quick-action-content">
              <h4>Track Your Order</h4>
              <p>Get real-time updates on your order status</p>
              <button className="btn btn-outline btn-sm">Track Order</button>
            </div>
          </div>
          
          <div className="quick-action">
            <div className="quick-action-icon">🔄</div>
            <div className="quick-action-content">
              <h4>Returns & Exchanges</h4>
              <p>Easy returns within 30 days of purchase</p>
              <button className="btn btn-outline btn-sm">Start Return</button>
            </div>
          </div>
          
          <div className="quick-action">
            <div className="quick-action-icon">💬</div>
            <div className="quick-action-content">
              <h4>Live Chat</h4>
              <p>Chat with our support team instantly</p>
              <button className="btn btn-primary btn-sm">Start Chat</button>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-map">
        <h3>Find Us</h3>
        <div className="map-placeholder">
          <div className="map-content">
            <div className="map-icon">🗺️</div>
            <h4>Our Location</h4>
            <p>Based in India</p>
            <p>Available for remote collaboration worldwide</p>
            <button className="btn btn-outline btn-sm">Contact for Meeting</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;