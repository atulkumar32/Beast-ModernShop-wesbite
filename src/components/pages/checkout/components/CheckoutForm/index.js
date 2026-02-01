'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser, selectIsAuthenticated } from '../../../../../redux/authSlice';
import './index.scss';

const CheckoutForm = ({ onComplete, onBack, canGoBack, orderData }) => {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [formData, setFormData] = useState({
    firstName: orderData?.firstName || user?.firstName || '',
    lastName: orderData?.lastName || user?.lastName || '',
    email: orderData?.email || user?.email || '',
    phone: orderData?.phone || user?.phone || '',
    address: orderData?.address || '',
    city: orderData?.city || '',
    state: orderData?.state || '',
    zipCode: orderData?.zipCode || '',
    country: orderData?.country || 'United States',
    saveAddress: false,
    ...orderData
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'ZIP code is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete(formData);
    }
  };

  return (
    <div className="checkout-form">
      <div className="checkout-form-header">
        <h2>Shipping Information</h2>
        <p>Please provide your shipping details</p>
      </div>

      <form onSubmit={handleSubmit} className="checkout-form-content">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={errors.firstName ? 'error' : ''}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={errors.lastName ? 'error' : ''}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email"
              disabled={isAuthenticated}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={errors.phone ? 'error' : ''}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Street Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={errors.address ? 'error' : ''}
            placeholder="Enter your street address"
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={errors.city ? 'error' : ''}
              placeholder="Enter your city"
            />
            {errors.city && <span className="error-message">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={errors.state ? 'error' : ''}
              placeholder="Enter your state"
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={errors.zipCode ? 'error' : ''}
              placeholder="12345"
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        {isAuthenticated && (
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="saveAddress"
                checked={formData.saveAddress}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Save this address for future orders
            </label>
          </div>
        )}

        <div className="checkout-form-actions">
          {canGoBack && (
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onBack}
            >
              Back to Cart
            </button>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;