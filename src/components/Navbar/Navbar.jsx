import React, { useState, useEffect, useContext } from 'react'; // Make sure useContext is here if not using useCart hook
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { 
    FaShoppingCart, FaUserCircle, FaSearch, FaBars, FaTimes, 
    FaSignInAlt, FaUserPlus, FaSignOutAlt 
} from 'react-icons/fa';
import { CartContext } from '../../context/CartContext'; // Import CartContext directly
import { useAuth } from '../../context/AuthContext';     // Import useAuth hook

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { cartItemCount } = useContext(CartContext); // Use useContext for cartItemCount
  const { isLoggedIn, currentUser, logout, isLoadingAuth } = useAuth();
  

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    closeMobileMenu();
    logout(); // This will navigate to /login via AuthContext's logout function
  };

  // Optional: Prevent rendering auth-dependent UI until auth status is known
  // if (isLoadingAuth) {
  //   return ( // Or a more styled Navbar skeleton
  //     <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
  //       <div className="navbar-container">
  //         <Link to="/" className="navbar-logo">AMAJOY ✨</Link>
  //         {/* Placeholder for icons or a loading spinner */}
  //       </div>
  //     </nav>
  //   );
  // }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo" 
          onClick={closeMobileMenu} 
          data-aos="fade-right" 
          data-aos-delay="100" // Keep AOS attributes if they were there
        >
          AMAJOY
        </Link>

        <div className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="nav-item" data-aos="fade-down" data-aos-delay="200"> {/* Keep AOS */}
            <NavLink to="/" className={({isActive}) => "nav-links" + (isActive ? " active-link" : "")} onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-down" data-aos-delay="300">
            <NavLink to="/products" className={({isActive}) => "nav-links" + (isActive ? " active-link" : "")} onClick={closeMobileMenu}>
              Products
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-down" data-aos-delay="400">
            <NavLink to="/categories" className={({isActive}) => "nav-links" + (isActive ? " active-link" : "")} onClick={closeMobileMenu}>
              Categories
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-down" data-aos-delay="500">
            <NavLink to="/about" className={({isActive}) => "nav-links" + (isActive ? " active-link" : "")} onClick={closeMobileMenu}>
              About Us
            </NavLink>
          </li>
          <li className="nav-item" data-aos="fade-down" data-aos-delay="600">
            <NavLink to="/contact" className={({isActive}) => "nav-links" + (isActive ? " active-link" : "")} onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="nav-icons">
          <Link to="/search" className="nav-icon-link" onClick={closeMobileMenu} aria-label="Search" data-aos="fade-left" data-aos-delay="300"> {/* Keep AOS */}
            <FaSearch />
          </Link>
          
          {isLoggedIn ? (
            <>
              <NavLink to="/account" className="nav-icon-link user-account-link" onClick={closeMobileMenu} aria-label="My Account" data-aos="fade-left" data-aos-delay="200">
                <FaUserCircle />
                {currentUser && <span className="navbar-username">{currentUser.name || currentUser.email.split('@')[0]}</span>} {/* Fallback for name */}
              </NavLink>
              <button onClick={handleLogout} className="nav-icon-link logout-button" aria-label="Logout" data-aos="fade-left" data-aos-delay="150">
                <FaSignOutAlt />
              </button>
            </>
          ) : ( // Show login/signup only if not loading auth and not logged in
            !isLoadingAuth && ( // Added !isLoadingAuth check
              <>
                <NavLink to="/login" className="nav-icon-link auth-link" onClick={closeMobileMenu} aria-label="Login" data-aos="fade-left" data-aos-delay="200">
                  <FaSignInAlt /> Login
                </NavLink>
                <NavLink to="/signup" className="nav-icon-link auth-link" onClick={closeMobileMenu} aria-label="Sign Up" data-aos="fade-left" data-aos-delay="150">
                  <FaUserPlus /> Sign Up
                </NavLink>
              </>
            )
          )}

          <Link to="/cart" className="nav-icon-link cart-icon" onClick={closeMobileMenu} aria-label="Shopping Cart" data-aos="fade-left" data-aos-delay="100">
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;