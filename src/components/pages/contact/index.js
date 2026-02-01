'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactForm from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import DeveloperInfo from './components/DeveloperInfo';
import { loadCart } from '../../../redux/cartSlice';
import { loadAuthData } from '../../../redux/authSlice';
import './index.scss';

const Contact = () => {
  const dispatch = useDispatch();

  // Load persisted data on mount (moved from Layout component)
  useEffect(() => {
    dispatch(loadCart());
    dispatch(loadAuthData());
  }, [dispatch]);

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form-section">
            <ContactForm />
          </div>
          <div className="contact-info-section">
            <ContactInfo />
            <DeveloperInfo />
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="contact-cta">
          <div className="contact-cta-content">
            <h2>Ready to Start Your Shopping Journey?</h2>
            <p>Browse our amazing collection of products and find exactly what you're looking for.</p>
            <div className="contact-cta-buttons">
              <a href="/products" className="btn btn-primary">
                Shop Now
              </a>
              <a href="/about" className="btn btn-outline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;