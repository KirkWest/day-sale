import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Provides context for user authentication and logic
// as well as login and logout functions
const UserContext = createContext(null); // Placeholder

// UserProvider is our component wrapper for areas that need UserContext
export const UserProvider = ({ children }) => {
  // Tracks user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // uses effect hook to check if there is a existing authenticaiton token
  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token); // if token present will set to isAuthenticated
  }, []);

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

      // Stores token in a cookie
      Cookies.set('token', token, {
        expires: 7,
        secure: true
      });

      setIsAuthenticated(true);
    } catch (error) {
      // handles errors in logging in
      console.error("Login unsuccessful:", error);
    }
  };

  // logout function, clears authentication token
  const logout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;