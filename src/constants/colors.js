// Color Constants
export const COLORS = {
  // Primary Colors
  PRIMARY: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary Colors
  SECONDARY: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Accent Colors
  ACCENT: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
  },
  
  // Neutral Colors
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status Colors
  SUCCESS: {
    50: '#ecfdf5',
    100: '#d1fae5',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
  },
  
  WARNING: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  
  ERROR: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  
  INFO: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  
  // Common Colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
};

// Theme Color Mappings
export const THEME_COLORS = {
  light: {
    background: {
      primary: COLORS.WHITE,
      secondary: COLORS.GRAY[50],
      tertiary: COLORS.GRAY[100],
    },
    text: {
      primary: COLORS.GRAY[900],
      secondary: COLORS.GRAY[600],
      muted: COLORS.GRAY[400],
      inverse: COLORS.WHITE,
    },
    border: {
      primary: COLORS.GRAY[200],
      secondary: COLORS.GRAY[300],
      light: COLORS.GRAY[100],
    },
  },
  dark: {
    background: {
      primary: COLORS.GRAY[900],
      secondary: COLORS.GRAY[800],
      tertiary: COLORS.GRAY[700],
    },
    text: {
      primary: COLORS.WHITE,
      secondary: COLORS.GRAY[300],
      muted: COLORS.GRAY[400],
      inverse: COLORS.GRAY[900],
    },
    border: {
      primary: COLORS.GRAY[700],
      secondary: COLORS.GRAY[600],
      light: COLORS.GRAY[800],
    },
  },
};

// Brand Colors
export const BRAND_COLORS = {
  primary: COLORS.PRIMARY[600],
  primaryHover: COLORS.PRIMARY[700],
  primaryLight: COLORS.PRIMARY[500],
  secondary: COLORS.SECONDARY[500],
  secondaryHover: COLORS.SECONDARY[600],
  accent: COLORS.ACCENT[500],
  accentHover: COLORS.ACCENT[600],
};

// Product Category Colors
export const CATEGORY_COLORS = {
  electronics: COLORS.PRIMARY[500],
  clothing: COLORS.SECONDARY[500],
  footwear: COLORS.ACCENT[500],
  accessories: COLORS.ERROR[500],
  'home-garden': COLORS.SUCCESS[500],
  'sports-fitness': COLORS.WARNING[500],
  'beauty-health': COLORS.PRIMARY[400],
  'books-media': COLORS.GRAY[600],
};

// Status Colors for UI Components
export const STATUS_COLORS = {
  success: COLORS.SUCCESS[500],
  warning: COLORS.WARNING[500],
  error: COLORS.ERROR[500],
  info: COLORS.INFO[500],
  pending: COLORS.WARNING[400],
  completed: COLORS.SUCCESS[500],
  cancelled: COLORS.ERROR[500],
};

// Gradient Definitions
export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.PRIMARY[600]} 0%, ${COLORS.PRIMARY[700]} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.SECONDARY[500]} 0%, ${COLORS.SECONDARY[600]} 100%)`,
  accent: `linear-gradient(135deg, ${COLORS.ACCENT[500]} 0%, ${COLORS.ACCENT[600]} 100%)`,
  hero: `linear-gradient(135deg, ${COLORS.PRIMARY[600]} 0%, ${COLORS.SECONDARY[500]} 100%)`,
  sunset: `linear-gradient(135deg, ${COLORS.SECONDARY[400]} 0%, ${COLORS.ERROR[400]} 100%)`,
  ocean: `linear-gradient(135deg, ${COLORS.PRIMARY[400]} 0%, ${COLORS.ACCENT[400]} 100%)`,
  rainbow: `linear-gradient(135deg, ${COLORS.PRIMARY[500]} 0%, ${COLORS.SECONDARY[500]} 25%, ${COLORS.ACCENT[500]} 50%, ${COLORS.ERROR[500]} 75%, ${COLORS.PRIMARY[500]} 100%)`,
};

// Shadow Definitions
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Color Utilities
export const getColorWithOpacity = (color, opacity) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || COLORS.GRAY[500];
};

export const getStatusColor = (status) => {
  return STATUS_COLORS[status] || COLORS.GRAY[500];
};