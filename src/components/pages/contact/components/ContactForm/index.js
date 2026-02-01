'use client';

import { useState } from 'react';
import './index.scss';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-form success">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <div className="contact-form-header">
        <h2>Send us a Message</h2>
        <p>We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Enter your full name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number (optional)"
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={errors.subject ? 'error' : ''}
              disabled={isSubmitting}
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="support">Customer Support</option>
              <option value="orders">Order Related</option>
              <option value="returns">Returns & Refunds</option>
              <option value="partnership">Partnership</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
            {errors.subject && <span className="error-message">{errors.subject}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? 'error' : ''}
            placeholder="Enter your message here..."
            rows="6"
            disabled={isSubmitting}
          />
          <div className="character-count">
            {formData.message.length}/500 characters
          </div>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        {errors.submit && (
          <div className="form-error">
            {errors.submit}
          </div>
        )}

        <div className="contact-form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner"></span>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>

      <div className="contact-form-footer">
        <p>
          <strong>Response Time:</strong> We typically respond within 24 hours during business days.
        </p>
        <p>
          <strong>Urgent Issues:</strong> For urgent matters, please call us directly at +1 (555) 123-4567.
        </p>
      </div>
    </div>
  );
};

export default ContactForm;