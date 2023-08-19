import React from "react";
import Header from "../components/Header"; // Import the Header component
import { Outlet } from "react-router-dom"; // Import Outlet from react-router-dom
import Footer from "../components/Footer"; // Import the Footer component

const Root = () => {
  return (
    <div>
      {/* Render the Header component */}
      <Header />

      {/* Render the child components defined by the routes */}
      <Outlet />

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

export default Root;
