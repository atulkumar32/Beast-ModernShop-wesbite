'use client';

import { useSelector } from 'react-redux';
import CartItems from './components/CartItems';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import { selectCartItems, selectCartIsEmpty } from '../../../redux/cartSlice';
import './index.scss';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const isEmpty = useSelector(selectCartIsEmpty);

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          {!isEmpty && (
            <p className="cart-subtitle">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <CartItems />
            </div>
            <div className="cart-summary-section">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;