// Local Storage Utilities

/**
 * Storage keys constants
 */
export const STORAGE_KEYS = {
  CART: 'ecommerce_cart',
  USER: 'ecommerce_user',
  AUTH_TOKEN: 'ecommerce_auth_token',
  THEME: 'ecommerce_theme',
  WISHLIST: 'ecommerce_wishlist',
  RECENT_SEARCHES: 'ecommerce_recent_searches',
  USER_PREFERENCES: 'ecommerce_user_preferences',
  VIEWED_PRODUCTS: 'ecommerce_viewed_products',
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isStorageAvailable = () => {
  try {
    if (typeof window === 'undefined') return false;
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if key doesn't exist
 * @returns {any} Stored value or default value
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (!isStorageAvailable()) return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting storage item ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @returns {boolean} Success status
 */
export const setStorageItem = (key, value) => {
  if (!isStorageAvailable()) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting storage item ${key}:`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeStorageItem = (key) => {
  if (!isStorageAvailable()) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing storage item ${key}:`, error);
    return false;
  }
};

/**
 * Clear all localStorage items
 * @returns {boolean} Success status
 */
export const clearStorage = () => {
  if (!isStorageAvailable()) return false;
  
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
};

/**
 * Get storage size in bytes
 * @returns {number} Storage size in bytes
 */
export const getStorageSize = () => {
  if (!isStorageAvailable()) return 0;
  
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

/**
 * Check if storage is nearly full (>90% of 5MB limit)
 * @returns {boolean} True if storage is nearly full
 */
export const isStorageNearlyFull = () => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const currentSize = getStorageSize();
  return currentSize > maxSize * 0.9;
};

// Cart Storage Functions
export const getCart = () => {
  return getStorageItem(STORAGE_KEYS.CART, []);
};

export const setCart = (cart) => {
  return setStorageItem(STORAGE_KEYS.CART, cart);
};

export const clearCart = () => {
  return removeStorageItem(STORAGE_KEYS.CART);
};

// User Storage Functions
export const getUser = () => {
  return getStorageItem(STORAGE_KEYS.USER, null);
};

export const setUser = (user) => {
  return setStorageItem(STORAGE_KEYS.USER, user);
};

export const clearUser = () => {
  return removeStorageItem(STORAGE_KEYS.USER);
};

// Auth Token Storage Functions
export const getAuthToken = () => {
  return getStorageItem(STORAGE_KEYS.AUTH_TOKEN, null);
};

export const setAuthToken = (token) => {
  return setStorageItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const clearAuthToken = () => {
  return removeStorageItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Theme Storage Functions
export const getTheme = () => {
  return getStorageItem(STORAGE_KEYS.THEME, 'light');
};

export const setTheme = (theme) => {
  return setStorageItem(STORAGE_KEYS.THEME, theme);
};

// Wishlist Storage Functions
export const getWishlist = () => {
  return getStorageItem(STORAGE_KEYS.WISHLIST, []);
};

export const setWishlist = (wishlist) => {
  return setStorageItem(STORAGE_KEYS.WISHLIST, wishlist);
};

export const clearWishlist = () => {
  return removeStorageItem(STORAGE_KEYS.WISHLIST);
};

// Recent Searches Storage Functions
export const getRecentSearches = () => {
  return getStorageItem(STORAGE_KEYS.RECENT_SEARCHES, []);
};

export const addRecentSearch = (search) => {
  const searches = getRecentSearches();
  const filteredSearches = searches.filter(s => s !== search);
  const updatedSearches = [search, ...filteredSearches].slice(0, 10); // Keep only 10 recent searches
  return setStorageItem(STORAGE_KEYS.RECENT_SEARCHES, updatedSearches);
};

export const clearRecentSearches = () => {
  return removeStorageItem(STORAGE_KEYS.RECENT_SEARCHES);
};

// User Preferences Storage Functions
export const getUserPreferences = () => {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    currency: 'USD',
    language: 'en',
    notifications: true,
    newsletter: false,
  });
};

export const setUserPreferences = (preferences) => {
  const currentPreferences = getUserPreferences();
  const updatedPreferences = { ...currentPreferences, ...preferences };
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, updatedPreferences);
};

// Viewed Products Storage Functions
export const getViewedProducts = () => {
  return getStorageItem(STORAGE_KEYS.VIEWED_PRODUCTS, []);
};

export const addViewedProduct = (productId) => {
  const viewedProducts = getViewedProducts();
  const filteredProducts = viewedProducts.filter(id => id !== productId);
  const updatedProducts = [productId, ...filteredProducts].slice(0, 20); // Keep only 20 viewed products
  return setStorageItem(STORAGE_KEYS.VIEWED_PRODUCTS, updatedProducts);
};

export const clearViewedProducts = () => {
  return removeStorageItem(STORAGE_KEYS.VIEWED_PRODUCTS);
};

// Session Storage Utilities (for temporary data)
export const getSessionItem = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting session item ${key}:`, error);
    return defaultValue;
  }
};

export const setSessionItem = (key, value) => {
  if (typeof window === 'undefined') return false;
  
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting session item ${key}:`, error);
    return false;
  }
};

export const removeSessionItem = (key) => {
  if (typeof window === 'undefined') return false;
  
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing session item ${key}:`, error);
    return false;
  }
};

// Storage Event Listener
export const addStorageListener = (callback) => {
  if (typeof window === 'undefined') return;
  
  const handleStorageChange = (e) => {
    callback(e.key, e.newValue, e.oldValue);
  };
  
  window.addEventListener('storage', handleStorageChange);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
};

// Backup and Restore Functions
export const backupStorage = () => {
  if (!isStorageAvailable()) return null;
  
  const backup = {};
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      backup[key] = localStorage[key];
    }
  }
  return backup;
};

export const restoreStorage = (backup) => {
  if (!isStorageAvailable() || !backup) return false;
  
  try {
    clearStorage();
    for (const key in backup) {
      localStorage.setItem(key, backup[key]);
    }
    return true;
  } catch (error) {
    console.error('Error restoring storage:', error);
    return false;
  }
};

// Storage Migration (for version updates)
export const migrateStorage = (migrations) => {
  const currentVersion = getStorageItem('storage_version', 1);
  
  migrations.forEach(migration => {
    if (migration.version > currentVersion) {
      try {
        migration.migrate();
        setStorageItem('storage_version', migration.version);
      } catch (error) {
        console.error(`Error migrating to version ${migration.version}:`, error);
      }
    }
  });
};