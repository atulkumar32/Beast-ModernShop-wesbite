'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../../../redux/productSlice';
import './index.scss';

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchQuery }));
  };

  return (
    <form onSubmit={handleSearch} className="product-search">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

export default ProductSearch;