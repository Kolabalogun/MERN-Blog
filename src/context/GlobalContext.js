import { createContext, useContext, useEffect, useState } from "react";
import { fetchAllBlogPosts, fetchUserBlogPosts } from "../api";

// Create a context
const AppContext = createContext();

// Create a provider component
const AppProvider = ({ children }) => {
  // State for user data
  const [user, setuser] = useState(localStorage.getItem("userData"));

  // Loading state
  const [loading, setLoading] = useState(false);

  // State to hold all blog posts
  const [posts, setPosts] = useState([]);

  // State to hold user-specific blog posts
  const [userPosts, setuserPosts] = useState([]);

  // Fetch Blog Posts on Page Load
  useEffect(() => {
    fetchAllPosts();
    fetchUserPosts();
  }, []);

  // Function to fetch all Blogs from the API
  const fetchAllPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchAllBlogPosts();
      setPosts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all blog posts:", error);
      setLoading(false);
    }
  };

  // Function to fetch user's Blogs from the API
  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchUserBlogPosts(user);
      setuserPosts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user's blog posts:", error);
      setLoading(false);
    }
  };

  // Provide values to the components
  return (
    <AppContext.Provider
      value={{
        user,
        setuser,
        posts,
        userPosts,
        fetchAllPosts,
        fetchUserPosts,
        loading,
        setLoading,
      }}
    >
      {/* Render children components */}
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
