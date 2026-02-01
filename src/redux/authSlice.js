import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, getUser, clearUser, setAuthToken, getAuthToken, clearAuthToken } from '../utils/storage';

// Async thunks for authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      setAuthToken(data.token);
      setUser(data.user);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Signup failed');
      }

      const data = await response.json();
      
      // Store token and user data
      setAuthToken(data.token);
      setUser(data.user);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`,
        },
      });

      // Clear stored data
      clearAuthToken();
      clearUser();
      
      return null;
    } catch (error) {
      // Even if API call fails, clear local data
      clearAuthToken();
      clearUser();
      return null;
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        return rejectWithValue('No token found');
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue('Token refresh failed');
      }

      const data = await response.json();
      setAuthToken(data.token);
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || 'Profile update failed');
      }

      const data = await response.json();
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  loginAttempts: 0,
  lastLoginAttempt: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Load auth data from storage
    loadAuthData: (state) => {
      const user = getUser();
      const token = getAuthToken();
      
      if (user && token) {
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
      }
    },

    // Clear auth data
    clearAuthData: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      clearUser();
      clearAuthToken();
    },

    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update user profile locally
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        setUser(state.user);
      }
    },

    // Set authentication status
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    // Reset login attempts
    resetLoginAttempts: (state) => {
      state.loginAttempts = 0;
      state.lastLoginAttempt = null;
    },

    // Increment login attempts
    incrementLoginAttempts: (state) => {
      state.loginAttempts += 1;
      state.lastLoginAttempt = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        state.loginAttempts = 0;
        state.lastLoginAttempt = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loginAttempts += 1;
        state.lastLoginAttempt = new Date().toISOString();
      });

    // Signup user
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loginAttempts = 0;
        state.lastLoginAttempt = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        // Still clear auth data even if logout API fails
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });

    // Refresh token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // If refresh fails, logout user
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        clearUser();
        clearAuthToken();
      });

    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  loadAuthData,
  clearAuthData,
  setLoading,
  clearError,
  updateUserProfile,
  setAuthenticated,
  resetLoginAttempts,
  incrementLoginAttempts,
} = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;
export const selectLoginAttempts = (state) => state.auth.loginAttempts;
export const selectLastLoginAttempt = (state) => state.auth.lastLoginAttempt;

// Complex selectors
export const selectUserFullName = (state) => {
  const user = state.auth.user;
  return user ? `${user.firstName} ${user.lastName}` : '';
};

export const selectUserInitials = (state) => {
  const user = state.auth.user;
  if (!user) return '';
  const firstInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : '';
  const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : '';
  return `${firstInitial}${lastInitial}`;
};

export const selectIsLoginBlocked = (state) => {
  const { loginAttempts, lastLoginAttempt } = state.auth;
  if (loginAttempts < 3) return false;
  
  if (lastLoginAttempt) {
    const lastAttempt = new Date(lastLoginAttempt);
    const now = new Date();
    const timeDiff = now - lastAttempt;
    const minutesDiff = timeDiff / (1000 * 60);
    
    // Block for 15 minutes after 3 failed attempts
    return minutesDiff < 15;
  }
  
  return false;
};

// Export reducer
export default authSlice.reducer;