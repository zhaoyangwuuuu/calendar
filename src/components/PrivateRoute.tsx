import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { authenticated } = useContext(AuthContext);

  return authenticated ? children : <Navigate to='/login' replace />;
};

export default PrivateRoute;
