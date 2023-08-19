import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";

import Root from "../pages/root";
import Auth from "../pages/auth";
import CreatePost from "../pages/createpost";
import MyPosts from "../pages/myposts";
import ProtectedRoute from "../components/auth/ProtectedRoutes";
import UnAuthenticated from "../components/auth/UnAuthenticated";

// Define the router configuration using createBrowserRouter
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, // Render the Home component for the root path
  },
  {
    path: "/auth",
    element: (
      <UnAuthenticated>
        {/* Render the Auth component within the UnAuthenticated component */}
        <Auth />
      </UnAuthenticated>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        {/* Render the Root component within the ProtectedRoute component */}
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/update-profile",
        element: <Auth />, // Render the Auth component for the update-profile path
      },
      {
        path: "/create-post",
        element: <CreatePost />, // Render the CreatePost component for the create-post path
      },
      {
        path: "/edit-post",
        element: <CreatePost />, // Render the CreatePost component for the edit-post path
      },
      {
        path: "/my-posts",
        element: <MyPosts />, // Render the MyPosts component for the my-posts path
      },
    ],
  },
]);
