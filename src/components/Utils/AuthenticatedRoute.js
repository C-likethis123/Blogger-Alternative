import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Unauthorized from "./Unauthorized";
const AuthenticatedRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return <Route path={path} component={isAuthenticated ? component : Unauthorized} />
};

export default AuthenticatedRoute;