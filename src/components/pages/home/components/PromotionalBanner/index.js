'use client';

import Link from 'next/link';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const PromotionalBanner = () => {
  return (
    <section className="promotional-banner">
      <div className="promotional-banner__container">
        <div className="promotional-banner__content">
          <div className="promotional-banner__text">
            <span className="promotional-banner__label">Limited Time Offer</span>
            <h2 className="promotional-banner__title">Up to 50% Off</h2>
            <p className="promotional-banner__description">
              Don't miss out on our biggest sale of the year. Shop now and save big on your favorite products.
            </p>
            <div className="promotional-banner__actions">
              <Link href={ROUTES.PRODUCTS} className="btn btn-primary promotional-banner__cta">
                Shop Sale
              </Link>
              <div className="promotional-banner__timer">
                <span className="timer-label">Ends in:</span>
                <div className="timer-display">
                  <div className="timer-unit">
                    <span className="timer-number">23</span>
                    <span className="timer-text">Hours</span>
                  </div>
                  <div className="timer-unit">
                    <span className="timer-number">45</span>
                    <span className="timer-text">Minutes</span>
                  </div>
                  <div className="timer-unit">
                    <span className="timer-number">12</span>
                    <span className="timer-text">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="promotional-banner__image">
            <img
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600"
              alt="Sale Banner"
              className="promotional-banner__img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;