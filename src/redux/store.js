import { configureStore } from '@reduxjs/toolkit';

// Import slices
import cartSlice from './cartSlice';
import authSlice from './authSlice';
import productSlice from './productSlice';

// Configure store
export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    products: productSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Export default store
export default store;