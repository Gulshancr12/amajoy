import React, { useState, useEffect } from 'react';
import './InfoPages.css'; // Shared CSS
import { toast } from 'react-toastify';
import AOS from 'aos';
import { FaMapMarkedAlt, FaPhoneAlt, FaEnvelopeOpenText, FaPaperPlane } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Your name is required.";
    if (!formData.email.trim()) errors.email = "Your email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email address is invalid.";
    if (!formData.subject.trim()) errors.subject = "Subject is required.";
    if (!formData.message.trim()) errors.message = "Message cannot be empty.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    console.log("Contact form submitted:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
    setFormErrors({});
    setIsSubmitting(false);
  };

  return (
    <div className="info-page-container contact-page" data-aos="fade-in">
      <header className="info-page-header contact-header-bg">
        <div className="info-header-overlay">
          <h1 data-aos="fade-down">Get In Touch</h1>
          <p data-aos="fade-up" data-aos-delay="100">We'd love to hear from you! Reach out with any questions or feedback.</p>
        </div>
      </header>

      <section className="info-section contact-details-section" data-aos="fade-up" data-aos-delay="200">
        <h2>Our Contact Information</h2>
        <div className="contact-info-grid">
          <div className="contact-info-item" data-aos="fade-up" data-aos-delay="300">
            <FaMapMarkedAlt className="contact-icon" />
            <h3>Our Address</h3>
            <p>Jodhpur, Rajasthan, IN 342006</p>
          </div>
          <div className="contact-info-item" data-aos="fade-up" data-aos-delay="400">
            <FaEnvelopeOpenText className="contact-icon" />
            <h3>Email Us</h3>
            <p><a href="mailto:support@amajoy.com">support@amajoy.com</a></p>
          </div>
          <div className="contact-info-item" data-aos="fade-up" data-aos-delay="500">
            <FaPhoneAlt className="contact-icon" />
            <h3>Call Us</h3>
            <p><a href="tel:+919877658978">(+91) 98776 58978</a></p>
          </div>
        </div>
      </section>

      <section className="info-section contact-form-section bg-pattern-light" data-aos="fade-up" data-aos-delay="100">
        <h2><FaPaperPlane className="info-section-icon" /> Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group-contact" data-aos="fade-right" data-aos-delay="200">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              {formErrors.name && <span className="error-text-contact">{formErrors.name}</span>}
            </div>
            <div className="form-group-contact" data-aos="fade-left" data-aos-delay="250">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
              {formErrors.email && <span className="error-text-contact">{formErrors.email}</span>}
            </div>
          </div>
          <div className="form-group-contact" data-aos="fade-up" data-aos-delay="300">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" />
            {formErrors.subject && <span className="error-text-contact">{formErrors.subject}</span>}
          </div>
          <div className="form-group-contact" data-aos="fade-up" data-aos-delay="350">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="6" value={formData.message} onChange={handleChange} placeholder="Write your message here..."></textarea>
            {formErrors.message && <span className="error-text-contact">{formErrors.message}</span>}
          </div>
          <button type="submit" className="contact-submit-btn" disabled={isSubmitting} data-aos="zoom-in" data-aos-delay="400">
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      {/* Optional: Map Section 
      <section className="info-section map-section" data-aos="fade-up">
        <h2>Find Us On The Map</h2>
        <div className="map-placeholder">
          {/* Replace with an actual map embed (e.g., Google Maps iframe) *}
          <p>Map will be embedded here.</p>
        </div>
      </section>
      */}
    </div>
  );
};

export default ContactPage;