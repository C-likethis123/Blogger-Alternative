import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: {
    children: React.ReactNode
}) => {
    const [isAuthenticated, useIsAuthenticated] = useState(document.cookie.includes("connect.sid"));
    return (<AuthContext.Provider value={isAuthenticated}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;