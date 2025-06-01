import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { useParams, Link } from 'react-router-dom';
import './ProductDetailPage.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CartContext } from '../../context/CartContext'; // <<< IMPORT CART CONTEXT
import { FaStar, FaShoppingCart, FaHeart, FaChevronLeft, FaChevronRight, FaMinus, FaPlus } from 'react-icons/fa';
// ... (renderStars helper function can stay here or be moved to a utils file)

const renderStars = (ratingValue, reviewCount) => {
  // ... (same as before)
  const stars = [];
  const fullStars = Math.floor(ratingValue);
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="star-filled" />);
  }
  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaStar key={`empty-${i}`} className="star-empty" />);
  }
  return <div className="pdp-rating-stars">{stars} <span className="pdp-review-count">({reviewCount} reviews)</span></div>;
};


const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const { addToCart } = useContext(CartContext); // <<< USE CART CONTEXT
  const [isAdding, setIsAdding] = useState(false); // For button animation/feedback
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const getMockImageGallery = (baseImage) => {
    // ... (same as before)
    if(!baseImage) return [];
    return [
      baseImage,
      baseImage.replace('/640/', '/641/'),
      baseImage.replace('/640/', '/642/'),
      baseImage.replace('/640/', '/643/'),
    ].filter((img, index, self) => self.indexOf(img) === index);
  };

  useEffect(() => {
    // ... (fetchProductDetails logic same as before)
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      setActiveImageIndex(0); // Reset image index on new product load
      setQuantity(1); // Reset quantity
      try {
        const productResponse = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!productResponse.ok) throw new Error(`Product fetch failed: ${productResponse.status}`);
        const productData = await productResponse.json();
        setProduct(productData);

        if (productData && productData.category) {
          const relatedResponse = await fetch(`https://fakestoreapi.com/products/category/${productData.category}?limit=5`);
          if (relatedResponse.ok) {
            let relatedData = await relatedResponse.json();
            relatedData = relatedData.filter(p => p.id !== productData.id).slice(0, 4);
            setRelatedProducts(relatedData);
          }
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProductDetails();
  }, [productId]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCartClick = () => {
    if (!product) return;
    setIsAdding(true);
    addToCart(product, quantity); // Use the addToCart function from context

    // UI feedback
    setShowAddedMessage(true);
    setTimeout(() => {
      setIsAdding(false);
      setShowAddedMessage(false);
    }, 2000); // Hide message after 2 seconds
  };

  const productImages = product ? getMockImageGallery(product.image) : [];
  const nextImage = () => setActiveImageIndex(prev => (prev + 1) % productImages.length);
  const prevImage = () => setActiveImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);

  // ... (Loading and Error JSX same as before)
  if (loading) { /* ... skeleton ... */ return <div className="pdp-container pdp-loading" data-aos="fade-in"> {/* ... */ } </div>; }
  if (error || !product) { /* ... error message ... */ return <div className="pdp-container pdp-error" data-aos="fade-in"> {/* ... */ } </div>; }


  return (
    <div className="pdp-container" data-aos="fade-in">
      {/* ... (Image Gallery JSX same as before) ... */}
      <div className="pdp-main-layout">
        <div className="pdp-image-gallery" data-aos="fade-right" data-aos-delay="100">
          {/* ... image gallery content ... */}
          <div className="pdp-main-image-container">
            {productImages.length > 1 && <button onClick={prevImage} className="gallery-nav prev"><FaChevronLeft /></button>}
            <img src={productImages[activeImageIndex] || product.image} alt={product.title} className="pdp-main-image" />
            {productImages.length > 1 && <button onClick={nextImage} className="gallery-nav next"><FaChevronRight /></button>}
          </div>
          {productImages.length > 1 && (
            <div className="pdp-thumbnail-strip">
              {productImages.map((img, index) => (
                <img key={index} src={img} alt={`${product.title} thumbnail ${index + 1}`} className={`pdp-thumbnail ${index === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(index)} />
              ))}
            </div>
          )}
        </div>

        <div className="pdp-details-content" data-aos="fade-left" data-aos-delay="200">
          <p className="pdp-category">{product.category}</p>
          <h1 className="pdp-title">{product.title}</h1>
          {renderStars(product.rating.rate, product.rating.count)}
          <p className="pdp-price">${product.price.toFixed(2)}</p>
          <p className="pdp-short-description">{product.description.substring(0, 150)}...</p>
          
          <div className="pdp-actions">
            <div className="pdp-quantity-selector">
              <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}><FaMinus /></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}><FaPlus /></button>
            </div>
            <button 
              className={`pdp-add-to-cart-btn ${isAdding ? 'adding' : ''}`} 
              onClick={handleAddToCartClick}
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : <><FaShoppingCart /> Add to Cart</>}
            </button>
            <button className="pdp-wishlist-btn" title="Add to Wishlist"> <FaHeart /> </button>
          </div>
          {showAddedMessage && <p className="pdp-added-message">Added to cart!</p>}

          {/* ... (Accordion JSX same as before) ... */}
          <div className="pdp-details-accordion"> {/* ... */} </div>
        </div>
      </div>

      {/* ... (Related Products JSX same as before) ... */}
      {relatedProducts.length > 0 && ( <div className="pdp-related-products" data-aos="fade-up" data-aos-delay="300"> {/* ... */} </div> )}
    </div>
  );
};

export default ProductDetailPage;