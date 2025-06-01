import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AuthPages.css';
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import AOS from 'aos';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        toast.success('Signup successful! Please log in.');
        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } else {
        toast.error(result.message || 'Failed to sign up. Please try again.');
        setError(result.message || 'Failed to sign up. Please try again.');
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error('An unexpected error occurred during signup. Please try again.');
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container" data-aos="fade-in">
      <div className="auth-form-wrapper">
        <div className="auth-form-header">
          <FaUserPlus className="auth-header-icon" />
          <h1 className="auth-title">Create Your Account</h1>
          <p className="auth-subtitle">Join AMAJOY today and start shopping!</p>
        </div>

        {error && <p className="auth-error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="100">
            <FaUser className="auth-input-icon" />
            <input type="text" id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="200">
            <FaEnvelope className="auth-input-icon" />
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="300">
            <FaLock className="auth-input-icon" />
            <input type="password" id="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-input-group" data-aos="fade-up" data-aos-delay="400">
            <FaLock className="auth-input-icon" />
            <input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="auth-input-field"/>
          </div>
          <div className="auth-form-options terms-option" data-aos="fade-up" data-aos-delay="450">
            <label htmlFor="terms" className="remember-me-label">
              <input type="checkbox" id="terms" name="terms" required />
              I agree to the <Link to="/terms-and-conditions" className="inline-link">Terms & Conditions</Link>
            </label>
          </div>
          <button type="submit" className="auth-submit-button" disabled={loading} data-aos="zoom-in" data-aos-delay="500">
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p className="auth-redirect-link" data-aos="fade-up" data-aos-delay="600">
          Already have an account? <Link to="/login">Log In Here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;