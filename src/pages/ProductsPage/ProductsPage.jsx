import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductsPage.css';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const ProductsPage = () => {
  const { categoryName } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Discover Our Collection');
  const [pageSubtitle, setPageSubtitle] = useState('Browse through our curated selection of high-quality products.');
  const [sortCriteria, setSortCriteria] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      let apiUrl = 'https://fakestoreapi.com/products'; 

      if (categoryName) {
        apiUrl = `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryName)}`;
        setPageTitle(`Shop: ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}`);
        setPageSubtitle(`Explore all products in the ${categoryName} category.`);
      } else {
        setPageTitle('All Products');
        setPageSubtitle('Browse through our entire selection of high-quality products.');
      }

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    setSortCriteria('default');
  }, [categoryName]);

  useEffect(() => {
    let productsToProcess = [...allProducts];
    switch (sortCriteria) {
      case 'price-asc':
        productsToProcess.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        productsToProcess.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        productsToProcess.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        productsToProcess.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        productsToProcess.sort((a,b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        break;
    }
    setDisplayedProducts(productsToProcess);
  }, [allProducts, sortCriteria]);

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  if (loading) { 
    return (
      <div className="products-page-container loading-state">
        <h1 className="products-page-title" data-aos="fade-down">{pageTitle}</h1>
        <div className="controls-bar" data-aos="fade-up">
          <div className="skeleton-control"></div>
          <div className="skeleton-control"></div>
        </div>
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="product-card-skeleton" data-aos="fade-up" data-aos-delay={index * 50}>
              <div className="skeleton-image"></div> <div className="skeleton-text short"></div>
              <div className="skeleton-text long"></div> <div className="skeleton-text medium"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // VVV CORRECTED ERROR RETURN STATEMENT VVV
  if (error) { 
    return (
      <div className="products-page-container error-state">
        <h1 className="products-page-title">{pageTitle}</h1> {/* Use dynamic pageTitle here too */}
        <p className="error-message-plp">Oops! Something went wrong while fetching products: {error}</p>
        <Link to="/products" className="retry-button-plp">View All Products</Link>
        {categoryName && ( /* Offer to go back to categories if on a category page */
            <Link to="/categories" className="retry-button-plp" style={{marginLeft: '10px'}}>Back to Categories</Link>
        )}
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <header className="products-page-header" data-aos="fade-in">
        <h1 className="products-page-title" data-aos="fade-down" data-aos-delay="100">{pageTitle}</h1>
        <p className="products-page-subtitle" data-aos="fade-up" data-aos-delay="200">
          {pageSubtitle}
        </p>
        {categoryName && (
          <Link to="/categories" className="back-to-categories-link" data-aos="fade-up" data-aos-delay="250">
            ← Back to All Categories
          </Link>
        )}
      </header>

      <div className="controls-bar" data-aos="fade-up" data-aos-delay="300">
        <div className="filter-controls">
          <button className="filter-btn">
            <FaFilter /> Filters (Soon)
          </button>
        </div>
        <div className="sort-controls">
          <label htmlFor="sort-select"><FaSortAmountDown /> Sort by: </label>
          <select id="sort-select" value={sortCriteria} onChange={handleSortChange} className="sort-dropdown">
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {displayedProducts.length === 0 && !loading ? (
        <p className="no-products-message">
          No products found {categoryName ? `in the ${categoryName} category` : ''} {sortCriteria !== 'default' ? 'with current filters/sort.' : '.'}
        </p>
      ) : (
        <div className="products-grid" data-aos-id="products-grid-animation">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;