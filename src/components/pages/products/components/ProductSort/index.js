'use client';

import { useDispatch, useSelector } from 'react-redux';
import { selectFilters, setFilters } from '../../../../../redux/productSlice';
import './index.scss';

const ProductSort = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)', sortBy: 'name', sortOrder: 'asc' },
    { value: 'name-desc', label: 'Name (Z-A)', sortBy: 'name', sortOrder: 'desc' },
    { value: 'price-asc', label: 'Price (Low to High)', sortBy: 'price', sortOrder: 'asc' },
    { value: 'price-desc', label: 'Price (High to Low)', sortBy: 'price', sortOrder: 'desc' },
    { value: 'rating-desc', label: 'Highest Rated', sortBy: 'rating', sortOrder: 'desc' },
    { value: 'rating-asc', label: 'Lowest Rated', sortBy: 'rating', sortOrder: 'asc' },
  ];

  const currentSortValue = `${filters.sortBy}-${filters.sortOrder}`;

  const handleSortChange = (e) => {
    const selectedOption = sortOptions.find(option => option.value === e.target.value);
    if (selectedOption) {
      dispatch(setFilters({
        sortBy: selectedOption.sortBy,
        sortOrder: selectedOption.sortOrder
      }));
    }
  };

  return (
    <div className="product-sort">
      <label htmlFor="sort-select" className="sort-label">Sort by:</label>
      <select
        id="sort-select"
        value={currentSortValue}
        onChange={handleSortChange}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;