// Application Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/[id]',
  CART: '/cart',
  CHECKOUT: '/checkout',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  CONTACT: '/contact',
  
  // Dynamic routes helpers
  getProductDetail: (id) => `/products/${id}`,
  getProductsByCategory: (category) => `/products?category=${category}`,
  getProductsByGender: (gender) => `/products?gender=${gender}`,
};

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    href: ROUTES.HOME,
    isActive: false,
  },
  {
    label: 'Products',
    href: ROUTES.PRODUCTS,
    isActive: false,
    submenu: [
      { label: 'All Products', href: ROUTES.PRODUCTS },
      { label: 'Electronics', href: `${ROUTES.PRODUCTS}?category=electronics` },
      { label: 'Clothing', href: `${ROUTES.PRODUCTS}?category=clothing` },
      { label: 'Footwear', href: `${ROUTES.PRODUCTS}?category=footwear` },
      { label: 'Accessories', href: `${ROUTES.PRODUCTS}?category=accessories` },
    ],
  },
  {
    label: 'About',
    href: ROUTES.ABOUT,
    isActive: false,
  },
  {
    label: 'Contact',
    href: ROUTES.CONTACT,
    isActive: false,
  },
];

// Footer Links
export const FOOTER_LINKS = {
  company: [
    { label: 'About Us', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Safety Center', href: '/safety' },
    { label: 'Community Guidelines', href: '/guidelines' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
  social: [
    { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { label: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
    { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  ],
};

// Breadcrumb configurations
export const BREADCRUMB_CONFIG = {
  [ROUTES.HOME]: [{ label: 'Home', href: ROUTES.HOME }],
  [ROUTES.ABOUT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'About', href: ROUTES.ABOUT },
  ],
  [ROUTES.PRODUCTS]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Products', href: ROUTES.PRODUCTS },
  ],
  [ROUTES.CART]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Cart', href: ROUTES.CART },
  ],
  [ROUTES.CHECKOUT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Cart', href: ROUTES.CART },
    { label: 'Checkout', href: ROUTES.CHECKOUT },
  ],
  [ROUTES.CONTACT]: [
    { label: 'Home', href: ROUTES.HOME },
    { label: 'Contact', href: ROUTES.CONTACT },
  ],
};