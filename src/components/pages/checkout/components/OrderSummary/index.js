'use client';

import { useSelector } from 'react-redux';
import { 
  selectCartItems, 
  selectCartTotalAmount, 
  selectCartTotalItems,
  selectCartSavings 
} from '../../../../../redux/cartSlice';
import './index.scss';

const OrderSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);
  const totalSavings = useSelector(selectCartSavings);

  const shippingCost = totalAmount > 100 ? 0 : 9.99;
  const tax = totalAmount * 0.08; // 8% tax
  const finalTotal = totalAmount + shippingCost + tax;

  return (
    <div className="order-summary">
      <div className="order-summary-header">
        <h3>Order Summary</h3>
        <span className="item-count">{totalItems} items</span>
      </div>

      <div className="order-items">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="order-item">
            <div className="order-item-image">
              <img src={item.image} alt={item.name} />
              <span className="quantity-badge">{item.quantity}</span>
            </div>
            
            <div className="order-item-details">
              <h4 className="order-item-name">{item.name}</h4>
              <div className="order-item-variants">
                {item.selectedColor && (
                  <span className="variant">Color: {item.selectedColor}</span>
                )}
                {item.selectedSize && (
                  <span className="variant">Size: {item.selectedSize}</span>
                )}
              </div>
            </div>
            
            <div className="order-item-price">
              <span className="current-price">${(item.price * item.quantity).toFixed(2)}</span>
              {item.originalPrice && item.originalPrice > item.price && (
                <span className="original-price">${(item.originalPrice * item.quantity).toFixed(2)}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="order-summary-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="total-row savings">
            <span>You Save</span>
            <span>-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        <div className="total-row">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="total-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="total-divider"></div>

        <div className="total-row final-total">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {totalAmount > 0 && totalAmount < 100 && (
        <div className="shipping-notice">
          <p>Add ${(100 - totalAmount).toFixed(2)} more for FREE shipping!</p>
        </div>
      )}

      <div className="security-info">
        <div className="security-item">
          <span className="security-icon">🔒</span>
          <span>SSL Encrypted</span>
        </div>
        <div className="security-item">
          <span className="security-icon">💳</span>
          <span>Secure Payment</span>
        </div>
        <div className="security-item">
          <span className="security-icon">🛡️</span>
          <span>Buyer Protection</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;