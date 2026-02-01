'use client';

import { useDispatch, useSelector } from 'react-redux';
import { 
  selectCartItems, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity 
} from '../../../../../redux/cartSlice';
import './index.scss';

const CartItems = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      productId: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity({
      productId: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({
      productId: item.id,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));
  };

  return (
    <div className="cart-items">
      <div className="cart-items-header">
        <h3>Items in your cart</h3>
      </div>
      
      <div className="cart-items-list">
        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <div className="cart-item-variants">
                {item.selectedColor && (
                  <span className="variant">Color: {item.selectedColor}</span>
                )}
                {item.selectedSize && (
                  <span className="variant">Size: {item.selectedSize}</span>
                )}
              </div>
              <div className="cart-item-price">
                <span className="current-price">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="original-price">${item.originalPrice}</span>
                )}
              </div>
            </div>
            
            <div className="cart-item-quantity">
              <button 
                className="quantity-btn"
                onClick={() => handleDecreaseQuantity(item)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => handleIncreaseQuantity(item)}
                disabled={item.quantity >= item.maxQuantity}
              >
                +
              </button>
            </div>
            
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            
            <button 
              className="cart-item-remove"
              onClick={() => handleRemoveItem(item)}
              title="Remove item"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItems;