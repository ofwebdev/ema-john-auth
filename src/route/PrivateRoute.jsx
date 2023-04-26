import React, { useContext } from "react";
import { AuthContext } from "../components/provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children, redirectTo }) {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return children;
  }
  return <Navigate to={redirectTo} state={{ from: location }} replace />;
}

export default PrivateRoute;
