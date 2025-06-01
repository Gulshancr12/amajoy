import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/about">Our Story</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/investors">Investors</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/contact">Contact</Link>
            <Link to="/support">Support</Link>
            <Link to="/destinations">Partnerships</Link>
            <Link to="/sponsorships">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Customer Care</h2>
            <Link to="/faq">FAQ</Link>
            <Link to="/shipping">Shipping & Returns</Link>
            <Link to="/track-order">Track Your Order</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /> Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /> LinkedIn</a>
          </div>
        </div>
      </div>
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our exclusive newsletter to receive the latest deals and trends
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <button className="footer-subscribe-btn">Subscribe</button>
          </form>
        </div>
      </section>
      <div className="footer-bottom">
        <Link to="/" className="social-logo">
          AMAJOY ✨
        </Link>
        <small className="website-rights">AMAJOY © {new Date().getFullYear()}</small>
      </div>
    </footer>
  );
};

export default Footer;