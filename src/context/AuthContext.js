import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // To redirect after login/logout

// Action Types (not strictly needed for useState, but good for clarity if scaling to useReducer)
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
// export const LOGOUT = 'LOGOUT';

// Create Context
export const AuthContext = createContext();

// Custom hook to use AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Will store user object or null
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check
  const navigate = useNavigate();

  // Effect to check for persisted user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('amaJoyUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('amaJoyUser'); // Clear corrupted data
      }
    }
    setIsLoading(false); // Finished initial loading
  }, []);

  // Simulate login
  const login = async (email, password) => {
    // In a real app, you'd make an API call here
    // For simulation:
    if (email && password) { // Basic check
      const mockUser = { 
        id: 'user123', 
        email: email, 
        name: email.split('@')[0] // Simple name generation
      }; 
      setCurrentUser(mockUser);
      localStorage.setItem('amaJoyUser', JSON.stringify(mockUser));
      // navigate('/'); // Redirect to home or dashboard after login
      return { success: true, user: mockUser };
    }
    return { success: false, message: "Invalid credentials (simulated)" };
  };

  // Simulate signup
  const signup = async (name, email, password) => {
    // In a real app, you'd make an API call to register the user
    // For simulation:
    if (name && email && password) { // Basic check
      const mockUser = { 
        id: `user-${Date.now()}`, // Generate a unique-ish ID
        email: email, 
        name: name 
      };
      setCurrentUser(mockUser);
      localStorage.setItem('amaJoyUser', JSON.stringify(mockUser));
      // navigate('/'); // Redirect to home or dashboard after signup
      return { success: true, user: mockUser };
    }
    return { success: false, message: "Signup failed (simulated - ensure all fields are filled)" };
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('amaJoyUser');
    navigate('/login'); // Redirect to login page after logout
  };

  const value = {
    currentUser,
    isLoggedIn: !!currentUser, // Boolean flag for convenience
    login,
    signup,
    logout,
    isLoadingAuth: isLoading, // To potentially show a loader while checking auth
  };

  // Don't render children until initial auth check is complete to avoid flashes of wrong UI
  // Or, render children and let them adapt based on isLoadingAuth
  // For simplicity, we'll render immediately, Navbar will adapt.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};