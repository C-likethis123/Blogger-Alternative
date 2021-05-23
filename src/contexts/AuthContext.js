import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext('');

export const AuthContextProvider = props => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(
    () => setIsAuthenticated(accessToken !== ''),
    [accessToken]
  );
  const logout = () => setAccessToken('');
  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, setAccessToken, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
};