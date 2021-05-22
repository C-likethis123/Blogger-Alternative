import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext('');

export const AuthContextProvider = props => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(
    () => setIsAuthenticated(accessToken !== ''),
    [accessToken]
  );
  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, setAccessToken }}>
      {props.children}
    </AuthContext.Provider>
  )
};