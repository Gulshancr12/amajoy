import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Your custom auth hook

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoadingAuth } = useAuth();
  const location = useLocation(); // To get the current path

  if (isLoadingAuth) {
    // Optional: Show a loading spinner or minimal layout while auth status is being checked
    // This prevents a flash of the login page if the user is actually logged in but
    // the persisted state hasn't been loaded yet by AuthContext.
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        {/* You can use your existing .loading-spinner class if defined globally or import it */}
        <div className="loading-spinner" style={{width: '50px', height: '50px', borderTopColor: 'var(--primary-color)'}}></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    // User not logged in, redirect to login page
    // Pass the current location in state so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
    // `replace` prevents the protected route from being added to history if not logged in
  }

  return children; // User is logged in, render the component they are trying to access
};

export default ProtectedRoute;