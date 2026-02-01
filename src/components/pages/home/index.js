'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import BestSellingProducts from './components/BestSellingProducts';
import NewArrivals from './components/NewArrivals';
import PromotionalBanner from './components/PromotionalBanner';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import { fetchProducts, fetchCategories } from '../../../redux/productSlice';
import { loadCart } from '../../../redux/cartSlice';
import { loadAuthData } from '../../../redux/authSlice';
import './index.scss';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.products);

  useEffect(() => {
    // Load persisted data
    dispatch(loadCart());
    dispatch(loadAuthData());
    
    // Fetch initial data
    dispatch(fetchProducts({ limit: 12 }));
    dispatch(fetchCategories());
  }, [dispatch]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => typeof window !== 'undefined' && window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Categories */}
      <FeaturedCategories />
      
      {/* Best Selling Products */}
      <BestSellingProducts />
      
      {/* Promotional Banner */}
      <PromotionalBanner />
      
      {/* New Arrivals */}
      <NewArrivals />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};

export default Home;