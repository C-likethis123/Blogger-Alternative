import React, { createContext, useState } from "react";

export const AuthContext = createContext('');

export const AuthContextProvider = props => {
  const [accessToken, setAccessToken] = useState('');
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {props.children}
    </AuthContext.Provider>
  )
};