'use client';

import Link from 'next/link';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart__content">
        <div className="empty-cart__icon">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
            <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
            <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
          </svg>
        </div>
        <h2 className="empty-cart__title">Your cart is empty</h2>
        <p className="empty-cart__description">
          Looks like you haven't added any items to your cart yet. 
          Start shopping to fill it up!
        </p>
        <Link href={ROUTES.PRODUCTS} className="btn btn-primary empty-cart__cta">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;