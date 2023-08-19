// Import necessary components and libraries
import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import react-toast for notifications
import "react-toastify/dist/ReactToastify.css";

import Loader from "./components/loader/loader";
import { router } from "./router";
import { useGlobalContext } from "./context/GlobalContext";

// Define the root App component
function App() {
  // Access the loading state from the global context
  const { loading } = useGlobalContext();

  // If loading is true, display the Loader component
  if (loading) {
    return <Loader />;
  }

  // JSX: Render the App component
  return (
    <>
      {/* ToastContainer Component: Displays notifications at the top-center */}
      <ToastContainer position="top-center" />

      {/* RouterProvider Component: Renders routing based on the router object */}
      <RouterProvider router={router} />
    </>
  );
}

// Export the App component as the default export
export default App;
