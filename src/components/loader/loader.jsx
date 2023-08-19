import React from "react";

// The Loader component displays a loading animation.
const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* Loader animation */}
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
