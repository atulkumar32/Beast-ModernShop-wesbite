'use client';

import { useState, useEffect } from 'react';
import './index.scss';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      rating: 5,
      text: 'Amazing quality products and fast shipping! I\'ve been shopping here for over a year and never been disappointed. The customer service is exceptional.',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Professional',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      rating: 5,
      text: 'The electronics section has everything I need for my home office. Great prices and authentic products. Highly recommend to anyone looking for quality tech gear.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Fitness Coach',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      rating: 5,
      text: 'Love the variety of fitness and sports products. The quality is top-notch and the delivery is always on time. This is my go-to store for all fitness needs.',
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Small Business Owner',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 5,
      text: 'Excellent experience every time I shop here. The website is easy to navigate, checkout is smooth, and the products always exceed my expectations.',
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
          <p>Don't just take our word for it</p>
        </div>

        <div className="testimonials__container">
          <div className="testimonials__slider">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonials__card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonials__content">
                  <div className="testimonials__rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="testimonials__text">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="testimonials__author">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="author-image"
                    />
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="testimonials__nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => goToTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="testimonials__stats">
          <div className="stat-item">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;