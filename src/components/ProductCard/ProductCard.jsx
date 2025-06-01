import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FaStar, FaCartPlus, FaEye } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';
// Assuming currency.js is at src/config/currency.js
import { formatPrice, DISPLAY_CURRENCY_VALUES_IN_INR, USD_TO_INR_RATE } from '../../config/currency'; 

const renderStars = (ratingData) => {
  if (!ratingData || typeof ratingData.rate !== 'number') {
    return <span className="no-rating"></span>; 
  }
  const ratingValue = ratingData.rate;
  const fullStars = Math.floor(ratingValue);
  const emptyStars = 5 - fullStars;
  let stars = [];
  for (let i = 0; i < fullStars; i++) stars.push(<FaStar key={`full-${i}`} className="star-icon full" />);
  for (let i = 0; i < emptyStars; i++) stars.push(<FaStar key={`empty-${i}`} className="star-icon empty" />);
  return stars;
};

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return null;
  }

  const productLink = `/product/${product.id}`;

  const handleAddToCart = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (isAdding) return; 
    setIsAdding(true);
    addToCart(product, 1); // CartContext now handles the toast
    setTimeout(() => {
      setIsAdding(false);
    }, 700); 
  };

  return (
    <div className="product-card-item" data-aos="fade-up">
      <Link to={productLink} className="product-card-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image-main" />
          <div className="product-card-overlay">
            <Link to={productLink} className="overlay-btn quick-view-btn" title="Quick View" onClick={(e) => e.stopPropagation()}>
              <FaEye />
            </Link>
            <button 
              className={`overlay-btn add-to-cart-btn-card ${isAdding ? 'adding' : ''}`} 
              title={isAdding ? "Adding..." : "Add to Cart"}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? <div className="mini-spinner"></div> : <FaCartPlus />}
            </button>
          </div>
          {/* Example badge logic - Uses imported config values */}
          {product.price && ((DISPLAY_CURRENCY_VALUES_IN_INR && (product.price * USD_TO_INR_RATE) < 4000) || (!DISPLAY_CURRENCY_VALUES_IN_INR && product.price < 50)) && (
             <span className="product-badge hot">DEAL</span>
          )}
        </div>
      </Link>
      <div className="product-info">
        <p className="product-category-name">{product.category}</p>
        <Link to={productLink} className="product-title-link">
          <h3 className="product-name">{product.title.substring(0, 45)}{product.title.length > 45 ? '...' : ''}</h3>
        </Link>
        <div className="product-price-rating">
          <p className="product-price-tag">{product.price ? formatPrice(product.price) : 'N/A'}</p>
          <div className="product-rating-stars">
            {product.rating && renderStars(product.rating)}
            {product.rating && typeof product.rating.count === 'number' && <span className="rating-count">({product.rating.count})</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;