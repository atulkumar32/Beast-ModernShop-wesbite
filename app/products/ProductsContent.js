'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import ProductFilters from '../../src/components/pages/products/components/ProductFilters';
import ProductGrid from '../../src/components/pages/products/components/ProductGrid';
import ProductSearch from '../../src/components/pages/products/components/ProductSearch';
import ProductSort from '../../src/components/pages/products/components/ProductSort';
import LoadingSpinner from '../../src/components/ui/LoadingSpinner';
import { 
  fetchProducts, 
  setFilters, 
  setCurrentPage,
  selectPaginatedProducts,
  selectIsLoading,
  selectError,
  selectTotalProducts,
  selectCurrentPage,
  selectTotalPages,
  selectViewMode,
  setViewMode
} from '../../src/redux/productSlice';
import { loadCart } from '../../src/redux/cartSlice';
import { loadAuthData } from '../../src/redux/authSlice';
import '../../src/components/pages/products/index.scss';

export default function ProductsContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  
  const products = useSelector(selectPaginatedProducts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const totalProducts = useSelector(selectTotalProducts);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const viewMode = useSelector(selectViewMode);
  
  const [showFilters, setShowFilters] = useState(false);

  // Load persisted data and initialize filters from URL params
  useEffect(() => {
    // Load persisted data
    dispatch(loadCart());
    dispatch(loadAuthData());

    const category = searchParams?.get('category');
    const gender = searchParams?.get('gender');
    const search = searchParams?.get('search');
    const sortBy = searchParams?.get('sortBy');
    const sortOrder = searchParams?.get('sortOrder');

    if (category || gender || search || sortBy || sortOrder) {
      dispatch(setFilters({
        category: category || '',
        gender: gender || '',
        search: search || '',
        sortBy: sortBy || 'name',
        sortOrder: sortOrder || 'asc'
      }));
    }

    // Fetch products with initial params
    dispatch(fetchProducts({
      category,
      gender,
      search,
      sortBy,
      sortOrder,
      page: 1,
      limit: 12
    }));
  }, [dispatch, searchParams]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    // Scroll to top
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-container">
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button 
              onClick={() => dispatch(fetchProducts())}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="products-header__content">
            <h1 className="products-title">Our Products</h1>
            <p className="products-subtitle">
              Discover amazing products from our curated collection
            </p>
          </div>
          
          {/* Search */}
          <ProductSearch />
        </div>

        {/* Toolbar */}
        <div className="products-toolbar">
          <div className="toolbar-left">
            <button 
              className="filter-toggle"
              onClick={toggleFilters}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
              </svg>
              Filters
            </button>
            
            <div className="results-count">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
            </div>
          </div>

          <div className="toolbar-right">
            <ProductSort />
            
            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => dispatch(setViewMode('grid'))}
                aria-label="Grid view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => dispatch(setViewMode('list'))}
                aria-label="List view"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="products-content">
          {/* Filters Sidebar */}
          <div className={`products-filters ${showFilters ? 'show' : ''}`}>
            <ProductFilters onClose={() => setShowFilters(false)} />
          </div>

          {/* Products Grid */}
          <div className="products-main">
            {isLoading ? (
              <div className="loading-container">
                <LoadingSpinner size="large" text="Loading products..." />
              </div>
            ) : (
              <>
                <ProductGrid products={products} viewMode={viewMode} />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          className={`pagination-number ${page === currentPage ? 'active' : ''}`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div 
          className="filter-overlay mobile-only"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}