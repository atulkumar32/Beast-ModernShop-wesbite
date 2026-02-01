// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints
export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `/products?category=${category}`,
  PRODUCTS_SEARCH: (query) => `/products/search?q=${query}`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_BY_ID: (id) => `/categories/${id}`,
  
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  
  // Cart
  CART: '/cart',
  CART_ADD: '/cart/add',
  CART_UPDATE: '/cart/update',
  CART_REMOVE: '/cart/remove',
  CART_CLEAR: '/cart/clear',
  
  // Orders
  ORDERS: '/orders',
  ORDER_BY_ID: (id) => `/orders/${id}`,
  ORDER_CREATE: '/orders/create',
  
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    ORDERS: '/user/orders',
    WISHLIST: '/user/wishlist',
  },
  
  // Contact
  CONTACT: '/contact',
  
  // Newsletter
  NEWSLETTER: '/newsletter/subscribe',
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Request Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Response Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.',
};

// Cache Configuration
export const CACHE_CONFIG = {
  PRODUCTS: {
    TTL: 5 * 60 * 1000, // 5 minutes
    KEY: 'products',
  },
  CATEGORIES: {
    TTL: 10 * 60 * 1000, // 10 minutes
    KEY: 'categories',
  },
  USER_PROFILE: {
    TTL: 2 * 60 * 1000, // 2 minutes
    KEY: 'user_profile',
  },
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1,
};

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300, // milliseconds
  MAX_SUGGESTIONS: 10,
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES: 5,
};

// Rate Limiting Configuration
export const RATE_LIMIT_CONFIG = {
  REQUESTS_PER_MINUTE: 60,
  REQUESTS_PER_HOUR: 1000,
};

// Environment-specific configurations
export const ENV_CONFIG = {
  development: {
    API_URL: 'http://localhost:3000/api',
    DEBUG: true,
    CACHE_ENABLED: false,
  },
  production: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    DEBUG: false,
    CACHE_ENABLED: true,
  },
  test: {
    API_URL: 'http://localhost:3001/api',
    DEBUG: false,
    CACHE_ENABLED: false,
  },
};

// Get current environment configuration
export const getCurrentEnvConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return ENV_CONFIG[env] || ENV_CONFIG.development;
};

// API Client Configuration
export const API_CLIENT_CONFIG = {
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: DEFAULT_HEADERS,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
};

// Mock API Configuration (for development)
export const MOCK_API_CONFIG = {
  ENABLED: process.env.NEXT_PUBLIC_MOCK_API === 'true',
  DELAY: 500, // milliseconds
  ERROR_RATE: 0.1, // 10% error rate for testing
};