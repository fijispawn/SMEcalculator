import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn === 'true';
  });

  const handleLogin = (status) => {
    setLoggedIn(status);
    localStorage.setItem('isLoggedIn', status); 
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};



