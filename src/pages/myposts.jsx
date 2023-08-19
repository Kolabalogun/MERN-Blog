import React from "react";
import Hero from "../components/home/hero"; // Import the Hero component
import Blogs from "../components/blog/myblogs"; // Import the Blogs component to display user's blog posts

const MyPosts = () => {
  return (
    <div>
      {/* Render the Hero component with custom text */}
      <Hero postTxt={"My Blog Posts"} />

      {/* Render the Blogs component to display user's blog posts */}
      <Blogs />
    </div>
  );
};

export default MyPosts;
