import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthPages.css';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      toast.error('Please fill in all email and password fields.');
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success(`Welcome back, ${result.user.name || result.user.email.split('@')[0]}!`);
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || 'Login failed. Please check credentials.');
        setError(result.message || 'Login failed. Please check credentials.'); 
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error('An unexpected error occurred during login. Please try again.');
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container" data-aos="fade-in">
      <div className="auth-form-wrapper">
        <div className="auth-form-header">
          <FaSignInAlt className="auth-header-icon" />
          <h1 className="auth-title">Welcome Back!</h1>
          <p className="auth-subtitle">Log in to continue your AMAJOY experience.</p>
        </div>

        {error && <p className="auth-error-message">{error}</p>} 

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="100">
            <FaEnvelope className="auth-input-icon" />
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="200">
            <FaLock className="auth-input-icon" />
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-form-options" data-aos="fade-up" data-aos-delay="250">
            <label htmlFor="remember-me" className="remember-me-label">
              <input type="checkbox" id="remember-me" name="remember-me" />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </div>
          <button type="submit" className="auth-submit-button" disabled={loading} data-aos="zoom-in" data-aos-delay="300">
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        <p className="auth-redirect-link" data-aos="fade-up" data-aos-delay="400">
          Don't have an account? <Link to="/signup">Sign Up Here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;