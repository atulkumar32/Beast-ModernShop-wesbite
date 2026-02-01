'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../common/Header';
import Footer from '../common/Footer';
import { loadCart } from '../../redux/cartSlice';
import { loadAuthData } from '../../redux/authSlice';
import './Layout.scss';

const Layout = ({ children, className = '' }) => {
  const dispatch = useDispatch();

  // Load persisted data on mount
  useEffect(() => {
    dispatch(loadCart());
    dispatch(loadAuthData());
  }, [dispatch]);

  return (
    <div className={`layout ${className}`}>
      <Header />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;