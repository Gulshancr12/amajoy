import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../../context/CartContext';
import './CheckoutPage.css';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCreditCard, FaLock, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AOS from 'aos';

import { formatPrice, formatItemTotalPrice } from '../../config/currency'; // Ensure this path is correct

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const { cartItems, cartSubtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    address: '',
    city: '',
    stateOrProvince: '', 
    postalCode: '',
    country: 'India',
    phone: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvc: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    if (name === "cardNumber") {
      processedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === "expiryDate") {
      processedValue = value.replace(/\D/g, '');
      if (processedValue.length > 2) {
        processedValue = processedValue.slice(0, 2) + '/' + processedValue.slice(2,4);
      }
      processedValue = processedValue.slice(0,5);
    } else if (name === "cvc") {
      processedValue = value.replace(/\D/g, '').slice(0, 3);
    }
    setPaymentDetails(prev => ({ ...prev, [name]: processedValue }));
  };

  const validateForm = () => {
    const errors = {};
    if (!shippingDetails.fullName.trim()) errors.fullName = "Full name is required.";
    if (!shippingDetails.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(shippingDetails.email)) errors.email = "Email is invalid.";
    if (!shippingDetails.address.trim()) errors.address = "Address is required.";
    if (!shippingDetails.city.trim()) errors.city = "City is required.";
    if (!shippingDetails.stateOrProvince.trim() && shippingDetails.country === 'India') {
        errors.stateOrProvince = "State/Province is required for India.";
    }
    if (!shippingDetails.postalCode.trim()) errors.postalCode = "Postal code is required.";
    if (!paymentDetails.cardName.trim()) errors.cardName = "Name on card is required.";
    if (!paymentDetails.cardNumber.replace(/\s/g, '')) errors.cardNumber = "Card number is required.";
    else if (paymentDetails.cardNumber.replace(/\s/g, '').length < 15) errors.cardNumber = "Card number is invalid (too short).";
    if (!paymentDetails.expiryDate) errors.expiryDate = "Expiry date is required.";
    else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentDetails.expiryDate)) errors.expiryDate = "Expiry date must be in MM/YY format.";
    if (!paymentDetails.cvc) errors.cvc = "CVC is required.";
    else if (paymentDetails.cvc.length < 3 || paymentDetails.cvc.length > 4) errors.cvc = "CVC must be 3 or 4 digits.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorKey = Object.keys(formErrors).find(key => formErrors[key]);
      const errorElement = document.getElementById(firstErrorKey || 'fullName');
      if (errorElement) {
          errorElement.focus();
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      toast.error("Please correct the errors in the form.");
      return;
    }
    setIsPlacingOrder(true);
    console.log("Placing order with details:", { shippingDetails, paymentDetails, cartItems });
    
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    const mockOrderId = `AMAJOY-${Date.now().toString().slice(-6)}`;
    
    const orderDetailsForConfirmation = {
      orderId: mockOrderId,
      items: [...cartItems], 
      total: cartSubtotal, 
      shippingAddress: { ...shippingDetails }
    };

    clearCart(); 
    setIsPlacingOrder(false);
    toast.success(`Order #${mockOrderId} placed successfully! Redirecting...`);
    navigate('/order-confirmation', { state: { orderDetails: orderDetailsForConfirmation }, replace: true });
  };

  if (cartItems.length === 0 && !isPlacingOrder) {
    return (
        <div className="checkout-page-container empty-checkout" data-aos="fade-in">
             <FaShoppingBag className="empty-checkout-icon" />
            <h2>Your Cart is Empty</h2>
            <p>Please add items to your cart before proceeding to checkout.</p>
            <button onClick={() => navigate('/products')} className="checkout-cta-button">
                Continue Shopping
            </button>
        </div>
    );
  }

  return (
    <div className="checkout-page-container" data-aos="fade-in">
      <header className="checkout-header" data-aos="fade-down">
        <h1>Secure Checkout</h1>
        <p>Complete your purchase by providing the details below.</p>
      </header>

      <form onSubmit={handleSubmitOrder} className="checkout-form-layout">
        <section className="checkout-section shipping-details" data-aos="fade-right" data-aos-delay="100">
            <h2><FaMapMarkerAlt /> Shipping Information</h2>
            <div className="form-grid">
                <div className="form-group"><label htmlFor="fullName">Full Name</label><input type="text" id="fullName" name="fullName" value={shippingDetails.fullName} onChange={handleShippingChange} placeholder="John Doe" required />{formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}</div>
                <div className="form-group"><label htmlFor="email">Email Address</label><input type="email" id="email" name="email" value={shippingDetails.email} onChange={handleShippingChange} placeholder="you@example.com" required />{formErrors.email && <span className="error-text">{formErrors.email}</span>}</div>
            </div>
            <div className="form-group"><label htmlFor="address">Street Address</label><input type="text" id="address" name="address" value={shippingDetails.address} onChange={handleShippingChange} placeholder="123 Main St, Apt 4B" required />{formErrors.address && <span className="error-text">{formErrors.address}</span>}</div>
            <div className="form-grid">
                <div className="form-group"><label htmlFor="city">City</label><input type="text" id="city" name="city" value={shippingDetails.city} onChange={handleShippingChange} placeholder="Anytown" required />{formErrors.city && <span className="error-text">{formErrors.city}</span>}</div>
                <div className="form-group"><label htmlFor="stateOrProvince">State / Province</label><input type="text" id="stateOrProvince" name="stateOrProvince" value={shippingDetails.stateOrProvince} onChange={handleShippingChange} placeholder="e.g., Maharashtra" required={shippingDetails.country === 'India'} />{formErrors.stateOrProvince && <span className="error-text">{formErrors.stateOrProvince}</span>}</div>
            </div>
            <div className="form-grid">
                <div className="form-group"><label htmlFor="postalCode">Postal Code / PIN Code</label><input type="text" id="postalCode" name="postalCode" value={shippingDetails.postalCode} onChange={handleShippingChange} placeholder="e.g., 400001" required />{formErrors.postalCode && <span className="error-text">{formErrors.postalCode}</span>}</div>
                <div className="form-group"><label htmlFor="country">Country</label><select id="country" name="country" value={shippingDetails.country} onChange={handleShippingChange} required><option value="India">India</option></select></div>
            </div>
            <div className="form-group"><label htmlFor="phone">Phone Number (Optional)</label><input type="tel" id="phone" name="phone" value={shippingDetails.phone} onChange={handleShippingChange} placeholder="(+91) 98765 43210" /></div>
        </section>

        <section className="checkout-section payment-details" data-aos="fade-right" data-aos-delay="200">
          <h2><FaCreditCard /> Payment Information</h2>
          <div className="form-group"><label htmlFor="cardName">Name on Card</label><input type="text" id="cardName" name="cardName" value={paymentDetails.cardName} onChange={handlePaymentChange} placeholder="John M Doe" required />{formErrors.cardName && <span className="error-text">{formErrors.cardName}</span>}</div>
          <div className="form-group"><label htmlFor="cardNumber">Card Number</label><input type="text" id="cardNumber" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentChange} placeholder="•••• •••• •••• ••••" maxLength="19" required />{formErrors.cardNumber && <span className="error-text">{formErrors.cardNumber}</span>}</div>
          <div className="form-grid">
            <div className="form-group"><label htmlFor="expiryDate">Expiry Date</label><input type="text" id="expiryDate" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentChange} placeholder="MM/YY" maxLength="5" required />{formErrors.expiryDate && <span className="error-text">{formErrors.expiryDate}</span>}</div>
            <div className="form-group"><label htmlFor="cvc">CVC</label><input type="text" id="cvc" name="cvc" value={paymentDetails.cvc} onChange={handlePaymentChange} placeholder="•••" maxLength="4" required />{formErrors.cvc && <span className="error-text">{formErrors.cvc}</span>}</div>
          </div>
          <div className="secure-payment-badge"><FaLock /> Secure Payment (Simulated)</div>
        </section>

        <aside className="checkout-summary" data-aos="fade-left" data-aos-delay="300">
            <h2>Order Summary</h2>
            {cartItems.map(item => (
            <div className="summary-cart-item" key={item.id}>
                <img src={item.image} alt={item.title} className="summary-item-image" />
                <div className="summary-item-details">
                <p className="summary-item-title">{item.title.substring(0,30)}...</p>
                <p className="summary-item-qty">Qty: {item.quantity}</p>
                </div>
                <p className="summary-item-price">{formatItemTotalPrice(item.price, item.quantity)}</p>
            </div>
            ))}
            <div className="summary-line-item"><span>Subtotal</span><span>{formatPrice(cartSubtotal)}</span></div>
            <div className="summary-line-item"><span>Shipping</span><span>FREE</span></div>
            <div className="summary-line-item total"><span>Total</span><span>{formatPrice(cartSubtotal)}</span></div>
            <button type="submit" className="checkout-cta-button" disabled={isPlacingOrder || cartItems.length === 0}>
            {isPlacingOrder ? 'Placing Order...' : `Place Order (${formatPrice(cartSubtotal)})`}
            </button>
        </aside>
      </form>
    </div>
  );
};

export default CheckoutPage;