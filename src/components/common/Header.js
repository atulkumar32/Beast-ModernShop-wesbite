'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { selectCartTotalItems } from '../../redux/cartSlice';
import { selectIsAuthenticated, selectUser, logoutUser } from '../../redux/authSlice';
import { ROUTES, NAVIGATION_ITEMS } from '../../constants/routes';
import './Header.scss';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  
  const cartItemsCount = useSelector(selectCartTotalItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${ROUTES.PRODUCTS}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push(ROUTES.HOME);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle search
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <Link href={ROUTES.HOME} className="logo">
              <span className="logo__text">ModernShop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav desktop-nav">
            <ul className="nav-list">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href} className="nav-item">
                  <Link href={item.href} className="nav-link">
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <ul className="submenu">
                      {item.submenu.map((subItem) => (
                        <li key={subItem.href} className="submenu-item">
                          <Link href={subItem.href} className="submenu-link">
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className={`header__search ${isSearchOpen ? 'header__search--open' : ''}`}>
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className="header__actions">
            {/* Search Toggle (Mobile) */}
            <button 
              className="action-btn search-toggle mobile-only"
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>

            {/* User Account */}
            <div className="header__user">
              {isAuthenticated ? (
                <div className="user-menu">
                  <button className="user-btn">
                    <div className="user-avatar">
                      {user?.firstName?.charAt(0) || 'U'}
                    </div>
                    <span className="user-name desktop-only">
                      {user?.firstName || 'User'}
                    </span>
                  </button>
                  <div className="user-dropdown">
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link href="/orders" className="dropdown-item">
                      Orders
                    </Link>
                    <Link href="/wishlist" className="dropdown-item">
                      Wishlist
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href={ROUTES.AUTH.LOGIN} className="action-btn login-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span className="desktop-only">Login</span>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href={ROUTES.CART} className="action-btn cart-btn">
              <div className="cart-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"></path>
                  <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"></path>
                  <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"></path>
                </svg>
                {cartItemsCount > 0 && (
                  <span className="cart-count">{cartItemsCount}</span>
                )}
              </div>
              <span className="desktop-only">Cart</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="action-btn menu-toggle mobile-only"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'hamburger--open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
          <ul className="mobile-nav-list">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href} className="mobile-nav-item">
                <Link 
                  href={item.href} 
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.submenu && (
                  <ul className="mobile-submenu">
                    {item.submenu.map((subItem) => (
                      <li key={subItem.href} className="mobile-submenu-item">
                        <Link 
                          href={subItem.href} 
                          className="mobile-submenu-link"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="search-overlay mobile-only">
          <div className="search-overlay__content">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                autoFocus
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
            <button 
              className="search-close"
              onClick={() => setIsSearchOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {(isMenuOpen || isSearchOpen) && (
        <div 
          className="header-overlay mobile-only"
          onClick={() => {
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;