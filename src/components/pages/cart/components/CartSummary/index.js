'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { 
  selectCartTotalAmount, 
  selectCartTotalItems,
  selectCartSavings 
} from '../../../../../redux/cartSlice';
import { ROUTES } from '../../../../../constants/routes';
import './index.scss';

const CartSummary = () => {
  const router = useRouter();
  const totalAmount = useSelector(selectCartTotalAmount);
  const totalItems = useSelector(selectCartTotalItems);
  const totalSavings = useSelector(selectCartSavings);

  const shippingCost = totalAmount > 100 ? 0 : 9.99;
  const tax = totalAmount * 0.08; // 8% tax
  const finalTotal = totalAmount + shippingCost + tax;

  const handleCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  const handleContinueShopping = () => {
    router.push(ROUTES.PRODUCTS);
  };

  return (
    <div className="cart-summary">
      <div className="cart-summary-header">
        <h3>Order Summary</h3>
      </div>

      <div className="cart-summary-details">
        <div className="summary-row">
          <span>Items ({totalItems})</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="summary-row savings">
            <span>You Save</span>
            <span>-${totalSavings.toFixed(2)}</span>
          </div>
        )}

        <div className="summary-row">
          <span>Shipping</span>
          <span>
            {shippingCost === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="summary-row">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="summary-divider"></div>

        <div className="summary-row total">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {totalAmount > 0 && totalAmount < 100 && (
        <div className="shipping-notice">
          <p>Add ${(100 - totalAmount).toFixed(2)} more for FREE shipping!</p>
          <div className="shipping-progress">
            <div 
              className="shipping-progress-bar"
              style={{ width: `${(totalAmount / 100) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="cart-summary-actions">
        <button 
          className="btn btn-primary checkout-btn"
          onClick={handleCheckout}
          disabled={totalAmount === 0}
        >
          Proceed to Checkout
        </button>
        
        <button 
          className="btn btn-outline continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>

      <div className="security-badges">
        <div className="security-badge">
          <span>🔒</span>
          <span>Secure Checkout</span>
        </div>
        <div className="security-badge">
          <span>📦</span>
          <span>Free Returns</span>
        </div>
        <div className="security-badge">
          <span>🚚</span>
          <span>Fast Delivery</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;