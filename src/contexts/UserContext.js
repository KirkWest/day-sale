import React, { createContext, useState, useEffect, useContext } from 'react';
import GlobalStateContext from './GlobalStateContext';

// Provides context for user authentication and logic
// as well as login and logout functions
const UserContext = createContext(null);

// UserProvider is our component wrapper for areas that need UserContext
export const UserProvider = ({ children }) => {
  // Tracks user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { setIsLoginModalOpen } = useContext(GlobalStateContext);

  // uses effect hook to check if there is a existing authenticaiton token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // !! changes the response to a boolean instead of fetching the token and sets to true
  }, []);

  useEffect(() => {
    // this is to handle the open login modal event upon token expiring
    const handleOpenLoginModal = () => {
      setIsLoginModalOpen(true);
    };

    // listener for the custom event openLoginModal
    window.addEventListener('openLoginModal', handleOpenLoginModal);

    // removes event listener
    return () => {
      window.removeEventListener('openLoginModal', handleOpenLoginModal);
    };
  }, [setIsLoginModalOpen]);

  // Authenticates user on login
  const login = async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login Unsuccessful');
      }

      // Extracts the token from our response
      const { token } = await response.json();

      // this will store the token in local storage
      localStorage.setItem('token', token);
      setIsAuthenticated(true);

      // closes the modal if logged in
      setIsLoginModalOpen(false);
    } catch (error) {
      // handles errors in logging in
      console.error("Login unsuccessful:", error);
    }
  };

  // logout function, clears authentication token
  const logout = () => {
    //removes the token from local storage
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;