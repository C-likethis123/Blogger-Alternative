import React from "react";
import { Route, RouteProps } from "react-router-dom";
import Unauthorized from "./Unauthorized";

interface AuthenticatedRouteProps {
  path: string;
  component: RouteProps['component'];
}
const AuthenticatedRoute = ({ path, component }: AuthenticatedRouteProps) => {
  return <Route path={path} component={component} />
};

export default AuthenticatedRoute;