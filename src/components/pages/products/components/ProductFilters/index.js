'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, selectCategories, setFilters, clearFilters } from '../../../../../redux/productSlice';
import './index.scss';

const ProductFilters = ({ onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const categories = useSelector(selectCategories);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="product-filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="close-btn mobile-only" onClick={onClose}>×</button>
      </div>

      <div className="filters-content">
        {/* Category Filter */}
        <div className="filter-group">
          <h4>Category</h4>
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                value=""
                checked={filters.category === ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              />
              All Categories
            </label>
            {categories.map(category => (
              <label key={category.id} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category.slug}
                  checked={filters.category === category.slug}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Gender Filter */}
        <div className="filter-group">
          <h4>Gender</h4>
          <div className="filter-options">
            {['', 'men', 'women', 'unisex'].map(gender => (
              <label key={gender} className="filter-option">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={filters.gender === gender}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                />
                {gender === '' ? 'All' : gender.charAt(0).toUpperCase() + gender.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="filter-group">
          <h4>Price Range</h4>
          <div className="price-inputs">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <span>to</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* In Stock Filter */}
        <div className="filter-group">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => handleFilterChange('inStock', e.target.checked)}
            />
            In Stock Only
          </label>
        </div>

        <button className="clear-filters-btn" onClick={handleClearFilters}>
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;