import { createContext, useState, useEffect } from "react";
import { ServerPaths } from "../utils/paths";
import axios from "axios";

type AuthValue = {
    isAuthenticated?: boolean;
    login?: () => void;
    logout?: () => void
}
const AuthContext = createContext<AuthValue>({} as AuthValue);

function useAuthContextProps(): AuthValue {
    const [isAuthenticated, setIsAuthenticated] = useState(document.cookie.includes("connect.sid"));
    const login = () => setIsAuthenticated(true);
    const logout = () => {
        axios.post(ServerPaths.Logout, {withCredential: true});
        setIsAuthenticated(document.cookie.includes("connect.sid"));
    }
    useEffect(() => {
        setIsAuthenticated(document.cookie.includes("connect.sid"))
    }, [document.cookie])
    return {
        isAuthenticated,
        login,
        logout,
    }
}

export const AuthProvider = ({ children}: {
    children: React.ReactNode;
    value?: AuthValue;
}) => {
    const values = useAuthContextProps();
    return (<AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;