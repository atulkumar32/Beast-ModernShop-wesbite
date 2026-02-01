'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { addToCart } from '../../redux/cartSlice';
import { ROUTES } from '../../constants/routes';
import { formatCurrency, generateStarRating } from '../../utils/helpers';
import './ProductCard.scss';

const ProductCard = ({ product, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({
      product,
      quantity: 1,
      selectedColor: product.colors?.[0] || 'Default',
      selectedSize: product.sizes?.[0] || 'Default',
    }));
  };

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const stars = generateStarRating(product.rating);

  return (
    <div 
      className={`product-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={ROUTES.getProductDetail(product.id)} className="product-card__link">
        {/* Product Image */}
        <div className="product-card__image">
          <img
            src={product.images?.[selectedImage] || product.image}
            alt={product.name}
            className="product-card__img"
          />
          
          {/* Image Navigation */}
          {product.images && product.images.length > 1 && (
            <div className="product-card__image-nav">
              {product.images.slice(0, 3).map((_, index) => (
                <button
                  key={index}
                  className={`image-nav-dot ${selectedImage === index ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageChange(index);
                  }}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="product-card__badges">
            {product.isNew && <span className="badge badge--new">New</span>}
            {product.discount > 0 && (
              <span className="badge badge--sale">-{product.discount}%</span>
            )}
            {!product.inStock && <span className="badge badge--out-of-stock">Out of Stock</span>}
          </div>

          {/* Quick Actions */}
          <div className={`product-card__actions ${isHovered ? 'visible' : ''}`}>
            <button
              className="action-btn wishlist-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to wishlist logic
              }}
              aria-label="Add to wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            
            <button
              className="action-btn quick-view-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Quick view logic
              }}
              aria-label="Quick view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-card__content">
          {/* Category */}
          <span className="product-card__category">{product.category}</span>

          {/* Title */}
          <h3 className="product-card__title">{product.name}</h3>

          {/* Rating */}
          <div className="product-card__rating">
            <div className="stars">
              {stars.map((star, index) => (
                <span key={index} className={`star star--${star}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="rating-count">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="product-card__price">
            <span className="current-price">{formatCurrency(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-card__colors">
              {product.colors.slice(0, 4).map((color, index) => (
                <div
                  key={index}
                  className="color-swatch"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="color-more">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="product-card__footer">
          <button
            className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                </svg>
                Add to Cart
              </>
            ) : (
              'Out of Stock'
            )}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;