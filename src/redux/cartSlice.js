import { createSlice } from '@reduxjs/toolkit';
import { setCart, getCart } from '../utils/storage';

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
};

// Helper functions
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

const findItemIndex = (items, productId, selectedColor, selectedSize) => {
  return items.findIndex(item => 
    item.id === productId && 
    item.selectedColor === selectedColor && 
    item.selectedSize === selectedSize
  );
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Load cart from localStorage
    loadCart: (state) => {
      try {
        const savedCart = getCart();
        if (savedCart && savedCart.length > 0) {
          state.items = savedCart;
          const totals = calculateTotals(savedCart);
          state.totalItems = totals.totalItems;
          state.totalAmount = totals.totalAmount;
        }
      } catch (error) {
        state.error = 'Failed to load cart from storage';
      }
    },

    // Add item to cart
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      
      const existingItemIndex = findItemIndex(
        state.items, 
        product.id, 
        selectedColor, 
        selectedSize
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          selectedColor,
          selectedSize,
          quantity,
          inStock: product.inStock,
          maxQuantity: product.maxQuantity || 10,
        };
        state.items.push(newItem);
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Save to localStorage
      setCart(state.items);
      
      state.error = null;
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const { productId, selectedColor, selectedSize } = action.payload;
      
      state.items = state.items.filter(item => 
        !(item.id === productId && 
          item.selectedColor === selectedColor && 
          item.selectedSize === selectedSize)
      );

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;

      // Save to localStorage
      setCart(state.items);
      
      state.error = null;
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { productId, selectedColor, selectedSize, quantity } = action.payload;
      
      const itemIndex = findItemIndex(
        state.items, 
        productId, 
        selectedColor, 
        selectedSize
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
        } else {
          // Update quantity
          state.items[itemIndex].quantity = Math.min(
            quantity, 
            state.items[itemIndex].maxQuantity
          );
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;

        // Save to localStorage
        setCart(state.items);
      }
      
      state.error = null;
    },

    // Increase item quantity
    increaseQuantity: (state, action) => {
      const { productId, selectedColor, selectedSize } = action.payload;
      
      const itemIndex = findItemIndex(
        state.items, 
        productId, 
        selectedColor, 
        selectedSize
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.quantity < item.maxQuantity) {
          item.quantity += 1;

          // Recalculate totals
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalAmount = totals.totalAmount;

          // Save to localStorage
          setCart(state.items);
        }
      }
      
      state.error = null;
    },

    // Decrease item quantity
    decreaseQuantity: (state, action) => {
      const { productId, selectedColor, selectedSize } = action.payload;
      
      const itemIndex = findItemIndex(
        state.items, 
        productId, 
        selectedColor, 
        selectedSize
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;

          // Recalculate totals
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.totalAmount = totals.totalAmount;

          // Save to localStorage
          setCart(state.items);
        }
      }
      
      state.error = null;
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
      state.error = null;

      // Clear from localStorage
      setCart([]);
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Apply discount/coupon
    applyDiscount: (state, action) => {
      const { discountAmount, discountType } = action.payload;
      
      if (discountType === 'percentage') {
        state.discountAmount = (state.totalAmount * discountAmount) / 100;
      } else {
        state.discountAmount = discountAmount;
      }
      
      state.finalAmount = state.totalAmount - state.discountAmount;
    },

    // Remove discount
    removeDiscount: (state) => {
      state.discountAmount = 0;
      state.finalAmount = state.totalAmount;
    },

    // Sync cart with server (for authenticated users)
    syncCart: (state, action) => {
      const serverCart = action.payload;
      if (serverCart && Array.isArray(serverCart)) {
        state.items = serverCart;
        const totals = calculateTotals(serverCart);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
        
        // Save to localStorage
        setCart(serverCart);
      }
    },
  },
});

// Export actions
export const {
  loadCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setLoading,
  setError,
  clearError,
  applyDiscount,
  removeDiscount,
  syncCart,
} = cartSlice.actions;

// Selectors
export const selectCart = (state) => state.cart;
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;
export const selectCartIsLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;
export const selectCartItemCount = (state) => state.cart.items.length;
export const selectCartIsEmpty = (state) => state.cart.items.length === 0;

// Complex selectors
export const selectCartItemById = (state, productId, selectedColor, selectedSize) => {
  return state.cart.items.find(item => 
    item.id === productId && 
    item.selectedColor === selectedColor && 
    item.selectedSize === selectedSize
  );
};

export const selectCartSubtotal = (state) => {
  return state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const selectCartSavings = (state) => {
  return state.cart.items.reduce((total, item) => {
    const savings = (item.originalPrice - item.price) * item.quantity;
    return total + (savings > 0 ? savings : 0);
  }, 0);
};

// Export reducer
export default cartSlice.reducer;