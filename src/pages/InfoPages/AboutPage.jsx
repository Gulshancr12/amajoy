import React, { useEffect } from 'react';
import './InfoPages.css'; // Shared CSS for About and Contact
import AOS from 'aos';
import { FaUsers, FaBullseye, FaLightbulb, FaHandsHelping } from 'react-icons/fa';

const AboutPage = () => {
  useEffect(() => {
    // AOS.init(); // Or rely on global init from App.js
    AOS.refresh(); // Refresh AOS animations for this page
  }, []);

  return (
    <div className="info-page-container about-page" data-aos="fade-in">
      <header className="info-page-header about-header-bg">
        <div className="info-header-overlay">
          <h1 data-aos="fade-down">About AMAJOY</h1>
          <p data-aos="fade-up" data-aos-delay="100">Discover the story behind your favorite shopping destination.</p>
        </div>
      </header>

      <section className="info-section our-story" data-aos="fade-up" data-aos-delay="200">
        <h2><FaUsers className="info-section-icon" /> Our Story</h2>
        <p>
          AMAJOY started with a simple idea: to bring joy to everyday shopping by offering a curated selection of high-quality, 
          unique, and delightful products. Founded in [Year], we embarked on a journey to create an e-commerce experience 
          that is not just about transactions, but about discovery, inspiration, and genuine customer satisfaction.
        </p>
        <p>
          From humble beginnings, we've grown into a passionate team dedicated to sourcing the best items from around the globe (or locally!), 
          ensuring that every product on AMAJOY meets our standards of excellence and brings a smile to your face.
        </p>
      </section>

      <section className="info-section our-mission-vision bg-pattern-light" data-aos="fade-up" data-aos-delay="100">
        <div className="mission-vision-grid">
          <div className="mission-item" data-aos="zoom-in-right" data-aos-delay="200">
            <h3><FaBullseye className="info-section-icon" /> Our Mission</h3>
            <p>
              To provide an unparalleled online shopping experience by offering a diverse range of exceptional products, 
              outstanding customer service, and a platform that inspires joy and discovery with every click.
            </p>
          </div>
          <div className="vision-item" data-aos="zoom-in-left" data-aos-delay="300">
            <h3><FaLightbulb className="info-section-icon" /> Our Vision</h3>
            <p>
              To be the most loved and trusted online store, known for our commitment to quality, innovation, 
              and creating lasting relationships with our customers and partners.
            </p>
          </div>
        </div>
      </section>

      <section className="info-section our-values" data-aos="fade-up" data-aos-delay="100">
        <h2><FaHandsHelping className="info-section-icon" /> Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card" data-aos="fade-up" data-aos-delay="200">
            <h4>Customer First</h4>
            <p>Your satisfaction is our top priority. We listen, we care, and we deliver.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="300">
            <h4>Quality Obsessed</h4>
            <p>We are committed to offering products that meet the highest standards of quality and craftsmanship.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="400">
            <h4>Integrity & Trust</h4>
            <p>We operate with honesty, transparency, and a commitment to building trust.</p>
          </div>
          <div className="value-card" data-aos="fade-up" data-aos-delay="500">
            <h4>Innovation & Joy</h4>
            <p>We constantly seek new ways to surprise, delight, and bring joy to your shopping experience.</p>
          </div>
        </div>
      </section>

      {/* Optional: Team Section 
      <section className="info-section our-team bg-pattern-dark" data-aos="fade-up">
        <h2>Meet the Team (Optional)</h2>
        <p>A brief introduction to the amazing people behind AMAJOY.</p>
        {/* Add team member cards here if desired *}
      </section>
      */}
    </div>
  );
};

export default AboutPage;

