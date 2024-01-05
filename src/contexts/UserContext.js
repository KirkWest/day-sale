import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext(null); // Placeholder

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token); // if token present will set to isAuthenticated
  }, []);

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