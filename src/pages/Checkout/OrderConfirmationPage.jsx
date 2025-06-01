import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';
import AOS from 'aos';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails; // Expecting orderId and items from CheckoutPage

  useEffect(() => {
    // If no orderDetails are passed (e.g., direct navigation), redirect to home
    if (!orderDetails) {
      // console.warn("No order details found, redirecting to home.");
      // navigate('/'); // Or to cart, or show an error
    }
    AOS.refresh(); // Refresh AOS for elements on this page
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    // This content will show briefly before navigate('/') if no orderDetails
    // Or you can show a more specific error message if preferred
    return (
      <div className="order-confirmation-container error-state-confirmation" data-aos="fade-in">
        <h1 className="confirmation-title">Oops!</h1>
        <p>It seems there was an issue retrieving your order details.</p>
        <Link to="/" className="confirmation-cta">Go to Homepage</Link>
      </div>
    );
  }


  return (
    <div className="order-confirmation-container" data-aos="fade-in">
      <div className="confirmation-box">
        <FaCheckCircle className="confirmation-icon" data-aos="zoom-in" data-aos-delay="100"/>
        <h1 className="confirmation-title" data-aos="fade-down" data-aos-delay="200">Thank You For Your Order!</h1>
        <p className="confirmation-subtitle" data-aos="fade-up" data-aos-delay="300">
          Your order <strong className="order-id">#{orderDetails.orderId}</strong> has been placed successfully.
        </p>
        <p className="confirmation-message" data-aos="fade-up" data-aos-delay="400">
          We've sent a confirmation email to you with the details. You can also track your order in your account.
        </p>

        <div className="confirmation-summary" data-aos="fade-up" data-aos-delay="500">
          <h3>Order Summary:</h3>
          {orderDetails.items && orderDetails.items.length > 0 ? (
            <ul>
              {orderDetails.items.map(item => (
                <li key={item.id}>
                  {item.title} (x{item.quantity}) - ${(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in this order summary.</p>
          )}
          <p className="summary-total-confirm">
            <strong>Total: ${orderDetails.total.toFixed(2)}</strong>
          </p>
        </div>

        <div className="confirmation-actions" data-aos="fade-up" data-aos-delay="600">
          <Link to="/products" className="confirmation-cta shop-more">
            <FaShoppingBag /> Continue Shopping
          </Link>
          <Link to="/account/orders" className="confirmation-cta view-orders">
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;