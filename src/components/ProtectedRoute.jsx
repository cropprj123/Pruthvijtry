// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const ProtectedRoute = ({ roles, element }) => {
  const hasAccess = useRole(roles);

  return hasAccess ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
