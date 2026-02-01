'use client';

import ProductCard from '../../../../../components/product/ProductCard';
import './index.scss';

const ProductGrid = ({ products, viewMode = 'grid' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-content">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-grid product-grid--${viewMode}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          className={`animate-fade-in stagger-${(index % 4) + 1}`}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductGrid;