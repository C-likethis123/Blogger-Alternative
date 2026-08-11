import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext('');
//TODO: persist data using local storage
export const AuthContextProvider = props => {
  const [accessToken, setAccessToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(
    () => setIsAuthenticated(true),
    [accessToken]
  );
  const logout = () => setAccessToken('');
  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, setAccessToken, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
};