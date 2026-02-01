import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for product operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      // Use mock API for development
      const { mockApi } = await import('../utils/mockApi');
      const data = await mockApi.getProducts(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      // Use mock API for development
      const { mockApi } = await import('../utils/mockApi');
      const data = await mockApi.getProductById(productId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Product not found');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      // Use mock API for development
      const { mockApi } = await import('../utils/mockApi');
      const data = await mockApi.getCategories();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ query, filters = {} }, { rejectWithValue }) => {
    try {
      // Use mock API for development
      const { mockApi } = await import('../utils/mockApi');
      const results = await mockApi.searchProducts(query, filters);
      return { query, results };
    } catch (error) {
      return rejectWithValue(error.message || 'Search failed');
    }
  }
);

// Initial state
const initialState = {
  // Products
  products: [],
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  productsPerPage: 12,
  
  // Current product (for product detail page)
  currentProduct: null,
  relatedProducts: [],
  
  // Categories
  categories: [],
  
  // Filters
  filters: {
    category: '',
    gender: '',
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name',
    sortOrder: 'asc',
    inStock: true,
  },
  
  // Search
  searchQuery: '',
  searchResults: [],
  searchSuggestions: [],
  recentSearches: [],
  
  // Loading states
  isLoading: false,
  isLoadingProduct: false,
  isLoadingCategories: false,
  isSearching: false,
  
  // Error states
  error: null,
  productError: null,
  categoriesError: null,
  searchError: null,
  
  // View preferences
  viewMode: 'grid', // 'grid' or 'list'
  showFilters: false,
};

// Product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Set filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        category: '',
        gender: '',
        minPrice: 0,
        maxPrice: 1000,
        sortBy: 'name',
        sortOrder: 'asc',
        inStock: true,
      };
    },

    // Set search query
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // Clear search
    clearSearch: (state) => {
      state.searchQuery = '';
      state.searchResults = [];
      state.searchError = null;
    },

    // Add to recent searches
    addToRecentSearches: (state, action) => {
      const query = action.payload;
      state.recentSearches = [
        query,
        ...state.recentSearches.filter(search => search !== query)
      ].slice(0, 10); // Keep only 10 recent searches
    },

    // Clear recent searches
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },

    // Set view mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },

    // Toggle filters visibility
    toggleFilters: (state) => {
      state.showFilters = !state.showFilters;
    },

    // Set current page
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    // Set products per page
    setProductsPerPage: (state, action) => {
      state.productsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page
    },

    // Clear current product
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.relatedProducts = [];
      state.productError = null;
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },

    clearProductError: (state) => {
      state.productError = null;
    },

    clearCategoriesError: (state) => {
      state.categoriesError = null;
    },

    clearSearchError: (state) => {
      state.searchError = null;
    },

    // Set search suggestions
    setSearchSuggestions: (state, action) => {
      state.searchSuggestions = action.payload;
    },

    // Clear search suggestions
    clearSearchSuggestions: (state) => {
      state.searchSuggestions = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || action.payload;
        state.totalProducts = action.payload.total || action.payload.length;
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || Math.ceil(state.totalProducts / state.productsPerPage);
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.products = [];
      });

    // Fetch product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.isLoadingProduct = true;
        state.productError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoadingProduct = false;
        state.currentProduct = action.payload.product || action.payload;
        state.relatedProducts = action.payload.relatedProducts || [];
        state.productError = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoadingProduct = false;
        state.productError = action.payload;
        state.currentProduct = null;
      });

    // Fetch categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoadingCategories = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false;
        state.categories = action.payload;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoadingCategories = false;
        state.categoriesError = action.payload;
        state.categories = [];
      });

    // Search products
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isSearching = true;
        state.searchError = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isSearching = false;
        state.searchResults = action.payload.results;
        state.searchQuery = action.payload.query;
        state.searchError = null;
        
        // Add to recent searches
        if (action.payload.query) {
          state.recentSearches = [
            action.payload.query,
            ...state.recentSearches.filter(search => search !== action.payload.query)
          ].slice(0, 10);
        }
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isSearching = false;
        state.searchError = action.payload;
        state.searchResults = [];
      });
  },
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setSearchQuery,
  clearSearch,
  addToRecentSearches,
  clearRecentSearches,
  setViewMode,
  toggleFilters,
  setCurrentPage,
  setProductsPerPage,
  clearCurrentProduct,
  clearError,
  clearProductError,
  clearCategoriesError,
  clearSearchError,
  setSearchSuggestions,
  clearSearchSuggestions,
} = productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products;
export const selectProductsList = (state) => state.products.products;
export const selectCurrentProduct = (state) => state.products.currentProduct;
export const selectRelatedProducts = (state) => state.products.relatedProducts;
export const selectCategories = (state) => state.products.categories;
export const selectFilters = (state) => state.products.filters;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSearchResults = (state) => state.products.searchResults;
export const selectSearchSuggestions = (state) => state.products.searchSuggestions;
export const selectRecentSearches = (state) => state.products.recentSearches;
export const selectViewMode = (state) => state.products.viewMode;
export const selectShowFilters = (state) => state.products.showFilters;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectTotalPages = (state) => state.products.totalPages;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectProductsPerPage = (state) => state.products.productsPerPage;

// Loading selectors
export const selectIsLoading = (state) => state.products.isLoading;
export const selectIsLoadingProduct = (state) => state.products.isLoadingProduct;
export const selectIsLoadingCategories = (state) => state.products.isLoadingCategories;
export const selectIsSearching = (state) => state.products.isSearching;

// Error selectors
export const selectError = (state) => state.products.error;
export const selectProductError = (state) => state.products.productError;
export const selectCategoriesError = (state) => state.products.categoriesError;
export const selectSearchError = (state) => state.products.searchError;

// Complex selectors
export const selectFilteredProducts = (state) => {
  const { products, filters } = state.products;
  
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Gender filter
    if (filters.gender && product.gender !== filters.gender && product.gender !== 'unisex') {
      return false;
    }
    
    // Price filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    
    // Stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }
    
    return true;
  });
};

export const selectSortedProducts = (state) => {
  const filteredProducts = selectFilteredProducts(state);
  const { sortBy, sortOrder } = state.products.filters;
  
  return [...filteredProducts].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle special sorting cases
    if (sortBy === 'price') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (sortBy === 'rating') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else if (sortBy === 'name') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const selectPaginatedProducts = (state) => {
  const sortedProducts = selectSortedProducts(state);
  const { currentPage, productsPerPage } = state.products;
  
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  
  return sortedProducts.slice(startIndex, endIndex);
};

export const selectFeaturedCategories = (state) => {
  return state.products.categories.filter(category => category.featured);
};

export const selectProductById = (state, productId) => {
  return state.products.products.find(product => product.id === parseInt(productId));
};

// Export reducer
export default productSlice.reducer;