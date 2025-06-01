import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <<< IMPORT useNavigate
import { CartContext } from '../../context/CartContext';
import './CartPage.css';
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaCreditCard } from 'react-icons/fa'; // Added FaCreditCard for checkout button
// AOS import can be removed if not using AOS attributes directly in this file

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartSubtotal,
  } = useContext(CartContext);

  const navigate = useNavigate(); // <<< INITIALIZE useNavigate

  const handleQuantityChange = (productId, currentQuantity, amount) => {
    const newQuantity = currentQuantity + amount;
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => { // <<< ADD HANDLER FUNCTION
    // Optionally: add checks here, e.g., if cart is empty, though UI already handles it
    // Or if user needs to be logged in (though ProtectedRoute on /checkout handles this)
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page-container empty-cart" data-aos="fade-in">
        <FaShoppingBag className="empty-cart-icon" />
        <h1 className="cart-title">Your Cart is Empty</h1>
        <p className="empty-cart-message">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="empty-cart-cta">
          <FaArrowLeft /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-container" data-aos="fade-in">
      <div className="cart-header" data-aos="fade-down">
        <h1 className="cart-title">Your Shopping Cart ({cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'})</h1>
        {cartItems.length > 0 && (
            <button onClick={clearCart} className="clear-cart-btn" data-aos="fade-left" data-aos-delay="100">
                <FaTrashAlt /> Clear Cart
            </button>
        )}
      </div>

      <div className="cart-layout">
        <div className="cart-items-list" data-aos="fade-right" data-aos-delay="200">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item.id} data-aos="fade-up" data-aos-anchor=".cart-items-list">
              <Link to={`/product/${item.id}`} className="cart-item-image-link">
                <img src={item.image} alt={item.title} className="cart-item-image" />
              </Link>
              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title-link">
                  <h3 className="cart-item-title">{item.title}</h3>
                </Link>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price-single">Unit Price: ${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item.id, item.quantity, -1)} disabled={item.quantity <= 1}>
                  <FaMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity, 1)}>
                  <FaPlus />
                </button>
              </div>
              <div className="cart-item-subtotal">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => removeFromCart(item.id)} className="cart-item-remove-btn" title="Remove item">
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary" data-aos="fade-left" data-aos-delay="300">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal ({cartItemCount} items)</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-item promo-code">
            <input type="text" placeholder="Enter Promo Code" />
            <button>Apply</button>
          </div>
          <div className="summary-total">
            <span>Estimated Total</span>
            <span>${cartSubtotal.toFixed(2)}</span>
          </div>
          {/* VVV UPDATE THIS BUTTON VVV */}
          <button 
            className="checkout-btn" 
            onClick={handleProceedToCheckout} 
            disabled={cartItems.length === 0} // Already disabled by UI if cart is empty
          >
            <FaCreditCard /> Proceed to Checkout 
          </button>
          <Link to="/products" className="continue-shopping-link">
            <FaArrowLeft /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;