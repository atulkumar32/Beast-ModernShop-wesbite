'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../src/components/pages/home/components/HeroSection';
import FeaturedCategories from '../src/components/pages/home/components/FeaturedCategories';
import BestSellingProducts from '../src/components/pages/home/components/BestSellingProducts';
import NewArrivals from '../src/components/pages/home/components/NewArrivals';
import PromotionalBanner from '../src/components/pages/home/components/PromotionalBanner';
import Testimonials from '../src/components/pages/home/components/Testimonials';
import Newsletter from '../src/components/pages/home/components/Newsletter';
import { fetchProducts, fetchCategories } from '../src/redux/productSlice';
import { loadCart } from '../src/redux/cartSlice';
import { loadAuthData } from '../src/redux/authSlice';
import '../src/components/pages/home/index.scss';

export default function Home() {
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
        <button onClick={() => window.location.reload()}>
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
}