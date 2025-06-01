import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesPage.css';
import AOS from 'aos'; // Ensure AOS is initialized

// Mock images for categories - in a real app, these would come from a CMS or be pre-defined
const categoryImages = {
  "electronics": "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  "jewelery": "https://images.unsplash.com/photo-1588444968343-44c440337403?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGpld2Vscnl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  "men's clothing": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1lbiUyMGNsb3RoaW5nfGVufDB8fHx8fHww&auto=format&fit=crop&w=500&q=60",
  "women's clothing": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4ncyUyMGNsb3RoaW5nfGVufDB8fHx8fHww&auto=format&fit=crop&w=500&q=60",
  // Add more if fakestoreapi expands its categories
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AOS.init(); // Or ensure it's globally initialized

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="categories-page-container loading-state">
        <h1 className="categories-page-title" data-aos="fade-down">Shop by Category</h1>
        <div className="categories-grid">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="category-card-skeleton" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="skeleton-cat-image"></div>
              <div className="skeleton-cat-title"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categories-page-container error-state">
        <h1 className="categories-page-title">Error</h1>
        <p>Could not load categories: {error}</p>
      </div>
    );
  }

  return (
    <div className="categories-page-container">
      <header className="categories-page-header" data-aos="fade-in">
        <h1 className="categories-page-title" data-aos="fade-down">Explore Our Categories</h1>
        <p className="categories-page-subtitle" data-aos="fade-up" data-aos-delay="100">
          Find exactly what you're looking for by browsing our curated collections.
        </p>
      </header>
      
      {categories.length > 0 ? (
        <div className="categories-grid" data-aos="fade-up" data-aos-delay="200">
          {categories.map((category, index) => (
            <Link 
              to={`/products/category/${encodeURIComponent(category)}`} 
              className="category-display-card" 
              key={category}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
            >
              <div className="category-card-image-wrapper">
                <img 
                  src={categoryImages[category.toLowerCase()] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'} // Fallback image
                  alt={category} 
                  className="category-card-image"
                />
                <div className="category-card-overlay-bg"></div>
              </div>
              <h3 className="category-card-name">{category}</h3>
            </Link>
          ))}
        </div>
      ) : (
        <p className="no-categories-message">No categories available at the moment.</p>
      )}
    </div>
  );
};

export default CategoriesPage;