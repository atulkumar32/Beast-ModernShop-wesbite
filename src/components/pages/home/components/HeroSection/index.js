'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Discover Amazing Products',
      subtitle: 'Shop the latest trends with unbeatable prices',
      description: 'Explore our vast collection of premium products carefully curated for your lifestyle.',
      buttonText: 'Shop Now',
      buttonLink: ROUTES.PRODUCTS,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 2,
      title: 'Electronics & Gadgets',
      subtitle: 'Latest technology at your fingertips',
      description: 'From smartphones to smart home devices, find cutting-edge technology that enhances your life.',
      buttonText: 'Explore Electronics',
      buttonLink: `${ROUTES.PRODUCTS}?category=electronics`,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      id: 3,
      title: 'Fashion Forward',
      subtitle: 'Style that speaks your language',
      description: 'Discover the latest fashion trends and timeless classics that define your unique style.',
      buttonText: 'Shop Fashion',
      buttonLink: `${ROUTES.PRODUCTS}?category=clothing`,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-section">
      <div className="hero-section__container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-section__slide ${index === currentSlide ? 'hero-section__slide--active' : ''}`}
            style={{ background: slide.background }}
          >
            <div className="container">
              <div className="hero-section__content">
                <div className="hero-section__text">
                  <h1 className="hero-section__title animate-slide-in-up">
                    {slide.title}
                  </h1>
                  <h2 className="hero-section__subtitle animate-slide-in-up stagger-1">
                    {slide.subtitle}
                  </h2>
                  <p className="hero-section__description animate-slide-in-up stagger-2">
                    {slide.description}
                  </p>
                  <div className="hero-section__actions animate-slide-in-up stagger-3">
                    <Link href={slide.buttonLink} className="btn btn-primary hero-section__cta">
                      {slide.buttonText}
                    </Link>
                    <Link href={ROUTES.ABOUT} className="btn btn-secondary hero-section__learn-more">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="hero-section__image animate-slide-in-right">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hero-section__img"
                  />
                  <div className="hero-section__image-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="hero-section__controls">
          <button
            className="hero-section__nav hero-section__nav--prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          <button
            className="hero-section__nav hero-section__nav--next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="hero-section__indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-section__indicator ${index === currentSlide ? 'hero-section__indicator--active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="hero-section__scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>

      {/* Features Bar */}
      <div className="hero-section__features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Free Shipping</h3>
                <p>On orders over $50</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"></path>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                  <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path>
                  <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Quality Guarantee</h3>
                <p>100% authentic products</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9,22 9,12 15,12 15,22"></polyline>
                </svg>
              </div>
              <div className="feature-content">
                <h3>Easy Returns</h3>
                <p>30-day return policy</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="feature-content">
                <h3>24/7 Support</h3>
                <p>Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;