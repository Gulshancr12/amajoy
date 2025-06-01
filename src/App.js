import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer } from 'react-toastify'; // For Toast Notifications
import 'react-toastify/dist/ReactToastify.css'; // CSS for react-toastify

// === Utils ===
import ScrollToTop from './utils/ScrollToTop';

// === Context Providers ===
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// === Core Layout Components ===
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

// === Page Components ===
import Home from './pages/Home/Home';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
// Assuming ForgotPasswordPage is in Auth folder if you created it:
// import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'; 
import AccountPage from './pages/AccountPage/AccountPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import OrderConfirmationPage from './pages/Checkout/OrderConfirmationPage';
import SearchPage from './pages/SearchPage/SearchPage';
import AboutPage from './pages/InfoPages/AboutPage';     // <<< IMPORTED AboutPage
import ContactPage from './pages/InfoPages/ContactPage';   // <<< IMPORTED ContactPage

// === Account Sub-Page Components ===
import ProfileSettings from './pages/AccountPage/ProfileSettings'; 

const AccountDashboard = () => (
  <div style={{padding: '20px'}} data-aos="fade-left">
    <h3>Account Dashboard</h3>
    <p>Welcome to your account dashboard. Select an option from the sidebar to manage your profile, orders, and addresses.</p>
  </div>
);
const OrderHistory = () => (
  <div style={{padding: '20px'}} data-aos="fade-left">
    <h3>Order History</h3>
    <p>You have no past orders. <Link to="/products" style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>Start shopping</Link> to see your orders here!</p>
  </div>
);
const SavedAddresses = () => (
  <div style={{padding: '20px'}} data-aos="fade-left">
    <h3>Saved Addresses</h3>
    <p>You haven't saved any addresses yet. Addresses will be saved during checkout.</p>
  </div>
);

// === Other Placeholder Page Components ===
// const AboutPage = () => ( ... ); // <<< REMOVED AboutPage Placeholder
// const ContactPage = () => ( ... ); // <<< REMOVED ContactPage Placeholder

const TermsPage = () => ( 
  <div style={{ paddingTop: '100px', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
    <h2>Terms & Conditions</h2>
    <p>Our terms and conditions. Coming Soon!</p>
  </div> 
);
const ForgotPasswordPage = () => ( // Keeping this placeholder if you haven't created the actual page
  <div style={{ paddingTop: '100px', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
    <h2>Forgot Password</h2>
    <p>Password recovery options. Coming Soon!</p>
  </div> 
);


function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <Router>
      <AuthProvider> 
        <CartProvider> 
          <ScrollToTop /> 
          <Navbar />
          <div className="page-content-wrapper">
            <Routes>
              {/* === Core E-commerce Routes === */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/category/:categoryName" element={<ProductsPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* === Auth Routes === */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* === Informational & Utility Routes === */}
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/about" element={<AboutPage />} /> {/* <<< Using imported component */}
              <Route path="/contact" element={<ContactPage />} /> {/* <<< Using imported component */}
              <Route path="/search" element={<SearchPage />} />
              <Route path="/terms-and-conditions" element={<TermsPage />} />
              
              {/* === Protected Account Routes with Nested Routes === */}
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <AccountPage /> 
                  </ProtectedRoute>
                } 
              >
                <Route index element={<AccountDashboard />} />
                <Route path="profile" element={<ProfileSettings />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="addresses" element={<SavedAddresses />} />
              </Route>

              {/* === Protected Checkout Route === */}
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/order-confirmation" 
                element={ <OrderConfirmationPage /> } 
              />
              
              {/* === 404 Not Found Page === */}
              <Route path="*" element={
                <div style={{ paddingTop: '100px', minHeight: '60vh', textAlign: 'center', padding: '20px' }}>
                  <h2>404 - Page Not Found</h2>
                  <p>Sorry, the page you are looking for does not exist.</p>
                  <Link to="/" style={{color: 'var(--primary-color)', textDecoration: 'underline'}}>Go to Homepage</Link>
                </div>
              } />
            </Routes>
          </div>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;