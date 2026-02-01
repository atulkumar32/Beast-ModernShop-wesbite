'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '../../constants/routes';
import './Footer.scss';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate newsletter subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer__main">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__section">
              <div className="footer__logo">
                <h3 className="logo-text">ModernShop</h3>
                <p className="footer__description">
                  Your ultimate destination for quality products at unbeatable prices. 
                  Shop with confidence and enjoy fast, reliable delivery.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="footer__social">
                <h4 className="footer__title">Follow Us</h4>
                <div className="social-links">
                  {FOOTER_LINKS.social.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="social-link"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIcon icon={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="footer__section">
              <h4 className="footer__title">Company</h4>
              <ul className="footer__links">
                {FOOTER_LINKS.company.map((link, index) => (
                  <li key={`company-${index}-${link.label}`}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer__section">
              <h4 className="footer__title">Support</h4>
              <ul className="footer__links">
                {FOOTER_LINKS.support.map((link, index) => (
                  <li key={`support-${index}-${link.label}`}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="footer__section">
              <h4 className="footer__title">Legal</h4>
              <ul className="footer__links">
                {FOOTER_LINKS.legal.map((link, index) => (
                  <li key={`legal-${index}-${link.label}`}>
                    <Link href={link.href} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__section">
              <h4 className="footer__title">Stay Updated</h4>
              <p className="footer__newsletter-text">
                Subscribe to our newsletter for the latest deals and updates.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <div className="newsletter-input-group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="newsletter-input"
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <p className="newsletter-success">
                    ✓ Successfully subscribed to our newsletter!
                  </p>
                )}
              </form>

              {/* Contact Info */}
              <div className="footer__contact">
                <div className="contact-item">
                  <span className="contact-icon">📧</span>
                  <span>pradipmourya172@gmail.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>+91 8057196070</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="footer__payments">
          <h4 className="footer__title">We Accept</h4>
          <div className="payment-methods">
            <div className="payment-card">Visa</div>
            <div className="payment-card">Mastercard</div>
            <div className="payment-card">PayPal</div>
            <div className="payment-card">Apple Pay</div>
            <div className="payment-card">Google Pay</div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} ModernShop. All rights reserved.
            </p>
            <div className="footer__bottom-links">
              <Link href="/privacy" className="footer__bottom-link">
                Privacy Policy
              </Link>
              <Link href="/terms" className="footer__bottom-link">
                Terms of Service
              </Link>
              <Link href="/cookies" className="footer__bottom-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Icon Component
const SocialIcon = ({ icon }) => {
  const icons = {
    facebook: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    twitter: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    instagram: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    linkedin: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  };

  return icons[icon] || null;
};

export default Footer;