import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './SearchPage.css';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom'; // To read query params
import AOS from 'aos';

const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]); // Store all products for searching
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedResults, setDisplayedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // For fetching all products
  const [isSearching, setIsSearching] = useState(false); // For when search is active
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // To show "no results" only after a search

  const location = useLocation();
  const navigate = useNavigate();

  // Effect to fetch all products once on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.error("Failed to fetch all products:", err);
        setError("Could not load products for search. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  // Effect to pre-fill search term from URL query parameter if present (e.g., /search?q=keyword)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const querySearchTerm = queryParams.get('q');
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
      // Trigger search if term comes from URL
      performSearch(querySearchTerm); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, allProducts]); // Rerun if allProducts loads after URL param is read


  const performSearch = useCallback((currentSearchTerm) => {
    if (!currentSearchTerm.trim()) {
      setDisplayedResults([]);
      setHasSearched(false);
      return;
    }
    setIsSearching(true);
    setHasSearched(true);

    const lowerSearchTerm = currentSearchTerm.toLowerCase();
    const results = allProducts.filter(product => 
      product.title.toLowerCase().includes(lowerSearchTerm) ||
      product.category.toLowerCase().includes(lowerSearchTerm) ||
      product.description.toLowerCase().includes(lowerSearchTerm)
    );
    
    // Simulate search delay for better UX if needed
    // setTimeout(() => {
      setDisplayedResults(results);
      setIsSearching(false);
    // }, 300);
  }, [allProducts]);


  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    // Optional: Live search as user types (can be performance intensive with many products)
    // if (e.target.value.trim() === '') {
    //   setDisplayedResults([]);
    //   setHasSearched(false);
    //   navigate('/search'); // Clear URL query
    // } else {
    //   performSearch(e.target.value);
    //   navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
    // }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`); // Update URL
      performSearch(searchTerm.trim()); // Perform search on explicit submit
    } else {
      setDisplayedResults([]);
      setHasSearched(false);
      navigate('/search'); // Clear URL query
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDisplayedResults([]);
    setHasSearched(false);
    navigate('/search'); // Clear URL query
  };

  if (isLoading && allProducts.length === 0) { // Show full page loader only if initial product list is loading
    return (
      <div className="search-page-container loading-initial" data-aos="fade-in">
        <div className="loading-spinner" style={{width: '60px', height: '60px', borderTopColor: 'var(--primary-color)'}}></div>
        <p>Preparing search...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-page-container error-state-search" data-aos="fade-in">
        <h1>Search Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="search-page-container" data-aos="fade-in">
      <header className="search-page-header" data-aos="fade-down">
        <h1>Find Your Favorite Products</h1>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-input-wrapper">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search for products, categories, keywords..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="search-input-field"
            />
            {searchTerm && (
              <button type="button" onClick={clearSearch} className="clear-search-btn" aria-label="Clear search">
                <FaTimes />
              </button>
            )}
          </div>
          <button type="submit" className="search-submit-btn" disabled={isSearching || !searchTerm.trim()}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      <div className="search-results-section">
        {isSearching && displayedResults.length === 0 && ( // Show loader if searching but no results yet
            <div className="search-loading-spinner">
                <div className="loading-spinner" style={{width: '50px', height: '50px', borderTopColor: 'var(--primary-color)'}}></div>
            </div>
        )}

        {!isSearching && hasSearched && displayedResults.length === 0 && (
          <p className="no-results-message">
            No products found matching "<strong>{searchTerm}</strong>". Try a different keyword.
          </p>
        )}

        {displayedResults.length > 0 && (
          <>
            <h2 className="results-count" data-aos="fade-up">
              Found {displayedResults.length} result{displayedResults.length !== 1 ? 's' : ''} for "<strong>{searchTerm}</strong>"
            </h2>
            <div className="products-grid search-results-grid" data-aos="fade-up" data-aos-delay="100">
              {displayedResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {!hasSearched && !isLoading && allProducts.length > 0 && (
             <p className="search-prompt-message">Type a keyword above and press Enter or click Search.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;