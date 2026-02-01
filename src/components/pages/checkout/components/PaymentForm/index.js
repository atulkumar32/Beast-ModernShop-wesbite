'use client';

import { useState } from 'react';
import './index.scss';

const PaymentForm = ({ onComplete, onBack, canGoBack, orderData }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: orderData?.address || '',
    billingCity: orderData?.city || '',
    billingState: orderData?.state || '',
    billingZipCode: orderData?.zipCode || '',
    sameAsShipping: true,
    saveCard: false,
    ...orderData
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = value;

    // Format card number
    if (name === 'cardNumber') {
      processedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (processedValue.length > 19) processedValue = processedValue.slice(0, 19);
    }

    // Format expiry date
    if (name === 'expiryDate') {
      processedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (processedValue.length > 5) processedValue = processedValue.slice(0, 5);
    }

    // Format CVV
    if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Auto-fill billing address if same as shipping
    if (name === 'sameAsShipping' && checked) {
      setFormData(prev => ({
        ...prev,
        billingAddress: orderData?.address || '',
        billingCity: orderData?.city || '',
        billingState: orderData?.state || '',
        billingZipCode: orderData?.zipCode || ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!formData.cardNumber.replace(/\s/g, '')) {
        newErrors.cardNumber = 'Card number is required';
      } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
        newErrors.cardNumber = 'Card number is invalid';
      }

      if (!formData.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Expiry date is invalid (MM/YY)';
      }

      if (!formData.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'CVV is invalid';
      }

      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = 'Cardholder name is required';
      }

      if (!formData.sameAsShipping) {
        if (!formData.billingAddress.trim()) {
          newErrors.billingAddress = 'Billing address is required';
        }
        if (!formData.billingCity.trim()) {
          newErrors.billingCity = 'Billing city is required';
        }
        if (!formData.billingState.trim()) {
          newErrors.billingState = 'Billing state is required';
        }
        if (!formData.billingZipCode.trim()) {
          newErrors.billingZipCode = 'Billing ZIP code is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onComplete({ ...formData, paymentMethod });
    }
  };

  const getCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'mastercard';
    if (cleanNumber.startsWith('3')) return 'amex';
    return 'card';
  };

  return (
    <div className="payment-form">
      <div className="payment-form-header">
        <h2>Payment Information</h2>
        <p>Choose your payment method and enter your details</p>
      </div>

      <div className="payment-methods">
        <div className="payment-method-tabs">
          <button
            type="button"
            className={`payment-tab ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
          >
            💳 Credit/Debit Card
          </button>
          <button
            type="button"
            className={`payment-tab ${paymentMethod === 'paypal' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('paypal')}
          >
            🅿️ PayPal
          </button>
          <button
            type="button"
            className={`payment-tab ${paymentMethod === 'apple' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('apple')}
          >
            🍎 Apple Pay
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form-content">
        {paymentMethod === 'card' && (
          <>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number *</label>
              <div className="card-input-wrapper">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? 'error' : ''}
                  placeholder="1234 5678 9012 3456"
                />
                <span className={`card-icon ${getCardType(formData.cardNumber)}`}></span>
              </div>
              {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date *</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className={errors.expiryDate ? 'error' : ''}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="cvv">CVV *</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? 'error' : ''}
                  placeholder="123"
                />
                {errors.cvv && <span className="error-message">{errors.cvv}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardholderName">Cardholder Name *</label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                className={errors.cardholderName ? 'error' : ''}
                placeholder="Enter name as it appears on card"
              />
              {errors.cardholderName && <span className="error-message">{errors.cardholderName}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="sameAsShipping"
                  checked={formData.sameAsShipping}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Billing address same as shipping address
              </label>
            </div>

            {!formData.sameAsShipping && (
              <div className="billing-address">
                <h4>Billing Address</h4>
                
                <div className="form-group">
                  <label htmlFor="billingAddress">Street Address *</label>
                  <input
                    type="text"
                    id="billingAddress"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    className={errors.billingAddress ? 'error' : ''}
                    placeholder="Enter billing address"
                  />
                  {errors.billingAddress && <span className="error-message">{errors.billingAddress}</span>}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="billingCity">City *</label>
                    <input
                      type="text"
                      id="billingCity"
                      name="billingCity"
                      value={formData.billingCity}
                      onChange={handleInputChange}
                      className={errors.billingCity ? 'error' : ''}
                      placeholder="Enter city"
                    />
                    {errors.billingCity && <span className="error-message">{errors.billingCity}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingState">State *</label>
                    <input
                      type="text"
                      id="billingState"
                      name="billingState"
                      value={formData.billingState}
                      onChange={handleInputChange}
                      className={errors.billingState ? 'error' : ''}
                      placeholder="Enter state"
                    />
                    {errors.billingState && <span className="error-message">{errors.billingState}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="billingZipCode">ZIP Code *</label>
                    <input
                      type="text"
                      id="billingZipCode"
                      name="billingZipCode"
                      value={formData.billingZipCode}
                      onChange={handleInputChange}
                      className={errors.billingZipCode ? 'error' : ''}
                      placeholder="12345"
                    />
                    {errors.billingZipCode && <span className="error-message">{errors.billingZipCode}</span>}
                  </div>
                </div>
              </div>
            )}

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="saveCard"
                  checked={formData.saveCard}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                Save this card for future purchases
              </label>
            </div>
          </>
        )}

        {paymentMethod === 'paypal' && (
          <div className="alternative-payment">
            <div className="payment-info">
              <h4>PayPal Payment</h4>
              <p>You will be redirected to PayPal to complete your payment securely.</p>
            </div>
            <div className="paypal-button">
              <button type="button" className="btn-paypal">
                Continue with PayPal
              </button>
            </div>
          </div>
        )}

        {paymentMethod === 'apple' && (
          <div className="alternative-payment">
            <div className="payment-info">
              <h4>Apple Pay</h4>
              <p>Use Touch ID or Face ID to pay with Apple Pay.</p>
            </div>
            <div className="apple-pay-button">
              <button type="button" className="btn-apple-pay">
                Pay with Apple Pay
              </button>
            </div>
          </div>
        )}

        <div className="payment-form-actions">
          {canGoBack && (
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onBack}
            >
              Back to Shipping
            </button>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            {paymentMethod === 'card' ? 'Complete Order' : `Pay with ${paymentMethod === 'paypal' ? 'PayPal' : 'Apple Pay'}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;