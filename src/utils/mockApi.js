// Mock API utilities for development
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import usersData from '../data/users.json';

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApi = {
  // Products
  async getProducts(params = {}) {
    await delay();
    
    let products = [...productsData];
    
    // Apply filters
    if (params.category) {
      products = products.filter(p => p.category === params.category);
    }
    
    if (params.gender) {
      products = products.filter(p => p.gender === params.gender || p.gender === 'unisex');
    }
    
    if (params.search) {
      const searchTerm = params.search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (params.minPrice) {
      products = products.filter(p => p.price >= params.minPrice);
    }
    
    if (params.maxPrice) {
      products = products.filter(p => p.price <= params.maxPrice);
    }
    
    // Apply sorting
    if (params.sortBy) {
      products.sort((a, b) => {
        let aVal = a[params.sortBy];
        let bVal = b[params.sortBy];
        
        if (params.sortBy === 'price' || params.sortBy === 'rating') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }
        
        if (params.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    
    // Apply pagination
    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      total: products.length,
      page,
      totalPages: Math.ceil(products.length / limit),
      hasMore: endIndex < products.length,
    };
  },

  async getProductById(id) {
    await delay();
    
    const product = productsData.find(p => p.id === parseInt(id));
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Get related products (same category, different product)
    const relatedProducts = productsData
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    
    return {
      product,
      relatedProducts,
    };
  },

  // Categories
  async getCategories() {
    await delay();
    return categoriesData;
  },

  async getCategoryById(id) {
    await delay();
    
    const category = categoriesData.find(c => c.id === parseInt(id));
    if (!category) {
      throw new Error('Category not found');
    }
    
    return category;
  },

  // Authentication
  async login(email, password) {
    await delay();
    
    const user = usersData.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: `mock_token_${user.id}_${Date.now()}`,
    };
  },

  async signup(userData) {
    await delay();
    
    // Check if user already exists
    const existingUser = usersData.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: usersData.length + 1,
      ...userData,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      user: userWithoutPassword,
      token: `mock_token_${newUser.id}_${Date.now()}`,
    };
  },

  async logout() {
    await delay();
    return { success: true };
  },

  // Search
  async searchProducts(query, filters = {}) {
    await delay();
    
    const searchTerm = query.toLowerCase();
    let results = productsData.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    // Apply additional filters
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    
    if (filters.minPrice) {
      results = results.filter(p => p.price >= filters.minPrice);
    }
    
    if (filters.maxPrice) {
      results = results.filter(p => p.price <= filters.maxPrice);
    }
    
    return results.slice(0, 20); // Limit search results
  },

  // Newsletter
  async subscribeNewsletter(email) {
    await delay();
    
    // Simulate validation
    if (!email || !email.includes('@')) {
      throw new Error('Invalid email address');
    }
    
    return { success: true, message: 'Successfully subscribed to newsletter' };
  },

  // Contact
  async submitContactForm(formData) {
    await delay();
    
    // Simulate validation
    if (!formData.name || !formData.email || !formData.message) {
      throw new Error('All fields are required');
    }
    
    return { success: true, message: 'Message sent successfully' };
  },
};

// Initialize mock data in Redux store
export const initializeMockData = () => {
  return {
    products: productsData,
    categories: categoriesData,
  };
};