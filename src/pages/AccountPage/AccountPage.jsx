import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'; // <<< IMPORT Outlet
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';
import { FaUserCircle, FaBoxOpen, FaMapMarkerAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
// AOS import can be removed if not using AOS attributes directly in this file

const AccountPage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="account-page-container" data-aos="fade-in">
      <header className="account-page-header">
        <h1 data-aos="fade-down">My Account</h1>
        <p data-aos="fade-up" data-aos-delay="100">Manage your AMAJOY profile and orders.</p>
      </header>

      <div className="account-layout">
        <aside className="account-sidebar" data-aos="fade-right" data-aos-delay="200">
          <div className="user-profile-summary">
            <FaUserCircle className="profile-avatar-icon" />
            <h3>{currentUser.name || currentUser.email.split('@')[0]}</h3>
            <p>{currentUser.email}</p>
          </div>
          <nav className="account-nav">
            {/* Use 'end' prop for the base /account link to avoid it always being active */}
            <NavLink to="/account" end className={({isActive}) => "account-nav-link" + (isActive ? " active" : "")}>
              <FaUserCircle /> Dashboard
            </NavLink>
            <NavLink to="/account/orders" className={({isActive}) => "account-nav-link" + (isActive ? " active" : "")}>
              <FaBoxOpen /> Order History
            </NavLink>
            <NavLink to="/account/profile" className={({isActive}) => "account-nav-link" + (isActive ? " active" : "")}>
              <FaCog /> Profile Settings
            </NavLink>
            <NavLink to="/account/addresses" className={({isActive}) => "account-nav-link" + (isActive ? " active" : "")}>
              <FaMapMarkerAlt /> Saved Addresses
            </NavLink>
            <button onClick={handleLogout} className="account-nav-link logout">
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        <main className="account-main-content" data-aos="fade-left" data-aos-delay="300">
          <Outlet /> {/* <<< THIS IS WHERE NESTED ROUTE COMPONENTS WILL RENDER */}
        </main>
      </div>
    </div>
  );
};

export default AccountPage;