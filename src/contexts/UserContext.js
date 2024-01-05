import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext(null); // Placeholder

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication status

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/me`, {
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Fetch user data unsuccessful");
          }

          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error when fetching users data:", error);
        }
      }
    };

    fetchUserData();
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
        secure: true // Set to false if not using HTTPS
      });

      setIsAuthenticated(true);
      // Optionally, set user data if included in the response
    } catch (error) {
      console.error("Login unsuccessful:", error);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;