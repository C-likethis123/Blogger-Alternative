import React, { useContext } from "react";
import { Route } from "react-router-dom";
import Unauthorized from "./Unauthorized";
const AuthenticatedRoute = ({ path, component }) => {
  return <Route path={path} component={component} />
};

export default AuthenticatedRoute;