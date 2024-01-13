import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext(null);

// global state for the login modal so it can be opened on any page
export const GlobalStateProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;