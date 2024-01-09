import React, { createContext, useState } from 'react';

const GlobalStateContext = createContext(null);

export const GlobalStateProvider = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <GlobalStateContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateContext;