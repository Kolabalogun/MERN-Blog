import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

// ProtectedRoute HOC
const ProtectedRoute = ({ children }) => {
  // Access the user object from the global context
  const { user } = useGlobalContext();

  // If user is authenticated, render the child components
  // Otherwise, redirect to the /auth route
  return user ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;
