import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import ProductCard from '../../components/ProductCard/ProductCard'; // Uses shared ProductCard

// Icons for non-product card sections
const TruckIcon = () => <span className="icon">🚚</span>;
const ShieldIcon = () => <span className="icon">🛡️</span>;
const TagIcon = () => <span className="icon">🏷️</span>;
const ArrowRightIcon = () => <span className="icon">➡️</span>;
// StarIcon for "Why Choose Us" if needed, or use direct emoji
const StarQualityIcon = () => <span className="icon">⭐</span>; // Example for "Why Choose Us"

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4));
        setNewArrivals(data.slice(4, 8));
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products for Home:", err);
        setError(err.message);
        setFeaturedProducts([]);
        setNewArrivals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="loading-spinner-container"><div className="loading-spinner"></div><p>Loading amazing deals...</p></div>;
  }
  if (error) {
    return <div className="error-message">Error fetching products: {error}. Please try again later.</div>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" data-aos="zoom-in-out" data-aos-duration="1500">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 data-aos="fade-down" data-aos-delay="300">Discover Your Next Favorite Thing</h1>
          <p data-aos="fade-up" data-aos-delay="500">
            Unbeatable prices, unmatched quality. Explore our latest collections.
          </p>
          <button className="cta-button" data-aos="zoom-in" data-aos-delay="700">
            Shop Now <ArrowRightIcon />
          </button>
        </div>
        <div className="hero-scroll-indicator" data-aos="fade-up" data-aos-delay="1000">
            <span>Scroll Down</span>
            <div className="mousey"><div className="scroller"></div></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products-section section-padding" id="featured-products">
        <h2 className="section-title" data-aos="fade-right">Featured Products</h2>
        <div className="product-grid" data-aos="fade-up" data-aos-delay="200">
          {featuredProducts.length > 0 ? 
            featuredProducts.map(product => <ProductCard key={product.id} product={product} />) : 
            <p>No featured products available.</p>}
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-showcase section-padding bg-light" id="categories">
        <h2 className="section-title" data-aos="fade-left">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card" data-aos="flip-left" data-aos-delay="100" style={{backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}><div className="category-overlay"><h3>Electronics</h3></div></div>
          <div className="category-card" data-aos="flip-left" data-aos-delay="200" style={{backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}><div className="category-overlay"><h3>Jewelery</h3></div></div>
          <div className="category-card" data-aos="flip-left" data-aos-delay="300" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}><div className="category-overlay"><h3>Men's Clothing</h3></div></div>
          <div className="category-card" data-aos="flip-left" data-aos-delay="400" style={{backgroundImage: "url('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')"}}><div className="category-overlay"><h3>Women's Clothing</h3></div></div>
        </div>
      </section>

      {/* Special Offer/Promo Banner */}
      <section className="promo-banner section-padding" data-aos="zoom-in-up">
        <div className="promo-content">
          <h2>MID-SEASON SALE!</h2>
          <p>Up to <span className="highlight">50% OFF</span> on selected items. Don't miss out!</p>
          <button className="cta-button-alt">Shop Sale <TagIcon /></button>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="products-section section-padding" id="new-arrivals">
        <h2 className="section-title" data-aos="fade-right">New Arrivals</h2>
        <div className="product-grid" data-aos="fade-up" data-aos-delay="200">
          {newArrivals.length > 0 ? 
            newArrivals.map(product => <ProductCard key={product.id} product={product} />) : 
            <p>No new arrivals to show right now.</p>}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us section-padding bg-dark text-light" id="why-us">
        <h2 className="section-title" data-aos="fade-up">Why Shop With Us?</h2>
        <div className="features-grid">
          <div className="feature-item" data-aos="fade-up" data-aos-delay="100"><TruckIcon /><h3>Fast Shipping</h3><p>Get your orders delivered swiftly to your doorstep.</p></div>
          <div className="feature-item" data-aos="fade-up" data-aos-delay="200"><ShieldIcon /><h3>Secure Payments</h3><p>Your transactions are safe with our encrypted payment gateways.</p></div>
          <div className="feature-item" data-aos="fade-up" data-aos-delay="300"><TagIcon /><h3>Best Deals</h3><p>We offer competitive prices and amazing discounts regularly.</p></div>
          <div className="feature-item" data-aos="fade-up" data-aos-delay="400"><StarQualityIcon /><h3>Quality Guaranteed</h3><p>Only the best products, curated for your satisfaction.</p></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section section-padding" id="testimonials">
        <h2 className="section-title" data-aos="fade-down">What Our Customers Say</h2>
        <div className="testimonials-slider" data-aos="fade-up">
          {/* Testimonial cards... */}
          <div className="testimonial-card" data-aos="zoom-in-left" data-aos-delay="100"><img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer Jane Doe" className="testimonial-avatar"/><p className="testimonial-text">"Absolutely love the quality and speed of delivery! Will definitely shop again."</p><h4 className="testimonial-author">- Jane D.</h4></div>
          <div className="testimonial-card" data-aos="zoom-in" data-aos-delay="200"><img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer John Smith" className="testimonial-avatar"/><p className="testimonial-text">"Found exactly what I was looking for at a great price. The customer service was excellent too!"</p><h4 className="testimonial-author">- John S.</h4></div>
          <div className="testimonial-card" data-aos="zoom-in-right" data-aos-delay="300"><img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer Alice B." className="testimonial-avatar"/><p className="testimonial-text">"The variety of products is amazing. My new go-to online store!"</p><h4 className="testimonial-author">- Alice B.</h4></div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section section-padding bg-gradient" id="newsletter">
        <div className="newsletter-content" data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-delay="300" data-aos-offset="0">
          <h2 data-aos="fade-down">Stay Updated!</h2>
          <p data-aos="fade-up" data-aos-delay="100">Subscribe to our newsletter for the latest deals, new arrivals, and exclusive offers.</p>
          <form className="newsletter-form" data-aos="fade-up" data-aos-delay="200">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="cta-button">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;