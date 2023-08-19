import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import Header from "../Header";
import Footer from "../Footer";

// UnAuthenticated HOC
const UnAuthenticated = ({ children }) => {
  // Access the user object from the global context
  const { user } = useGlobalContext();

  // If user is not authenticated, render the child components
  // Otherwise, redirect to the root path
  return !user ? (
    <>
      {/* Header Component: Renders the header section */}
      <Header />

      {/* Child components are rendered */}
      <div className="">{children}</div>

      {/* Footer Component: Renders the footer section */}
      <Footer />
    </>
  ) : (
    // Redirect to the root path if user is authenticated
    <Navigate to="/" />
  );
};

export default UnAuthenticated;
