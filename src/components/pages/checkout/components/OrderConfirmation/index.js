'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { clearCart, selectCartItems, selectCartTotalAmount } from '../../../../../redux/cartSlice';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const OrderConfirmation = ({ orderData }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);

  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Clear cart after successful order
    const timer = setTimeout(() => {
      dispatch(clearCart());
    }, 2000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleContinueShopping = () => {
    router.push(ROUTES.PRODUCTS);
  };

  const handleViewOrders = () => {
    // In a real app, this would navigate to orders page
    router.push(ROUTES.HOME);
  };

  const shippingCost = totalAmount > 100 ? 0 : 9.99;
  const tax = totalAmount * 0.08;
  const finalTotal = totalAmount + shippingCost + tax;

  return (
    <div className="order-confirmation">
      <div className="confirmation-header">
        <div className="success-icon">
          <div className="checkmark">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase. Your order has been successfully placed.</p>
      </div>

      <div className="order-details">
        <div className="order-info">
          <div className="info-card">
            <h3>Order Information</h3>
            <div className="info-row">
              <span>Order Number:</span>
              <span className="order-number">{orderNumber}</span>
            </div>
            <div className="info-row">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="info-row">
              <span>Estimated Delivery:</span>
              <span className="delivery-date">{estimatedDelivery}</span>
            </div>
            <div className="info-row">
              <span>Total Amount:</span>
              <span className="total-amount">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>Shipping Address</h3>
            <div className="address">
              <p>{orderData?.firstName} {orderData?.lastName}</p>
              <p>{orderData?.address}</p>
              <p>{orderData?.city}, {orderData?.state} {orderData?.zipCode}</p>
              <p>{orderData?.country}</p>
            </div>
          </div>

          <div className="info-card">
            <h3>Payment Method</h3>
            <div className="payment-info">
              {orderData?.paymentMethod === 'card' && (
                <p>Credit Card ending in ****{orderData?.cardNumber?.slice(-4)}</p>
              )}
              {orderData?.paymentMethod === 'paypal' && (
                <p>PayPal ({orderData?.email})</p>
              )}
              {orderData?.paymentMethod === 'apple' && (
                <p>Apple Pay</p>
              )}
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div className="item-variants">
                    {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-row final">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button 
          className="btn btn-primary"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <button 
          className="btn btn-outline"
          onClick={handleViewOrders}
        >
          View Orders
        </button>
      </div>

      <div className="next-steps">
        <h3>What's Next?</h3>
        <div className="steps">
          <div className="step">
            <div className="step-icon">📧</div>
            <div className="step-content">
              <h4>Order Confirmation Email</h4>
              <p>You'll receive a confirmation email with your order details shortly.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">📦</div>
            <div className="step-content">
              <h4>Processing & Shipping</h4>
              <p>Your order will be processed and shipped within 1-2 business days.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-icon">🚚</div>
            <div className="step-content">
              <h4>Tracking Information</h4>
              <p>You'll receive tracking information once your order ships.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;