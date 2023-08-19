import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBlogPost, editBlogPost } from "../api";

import { useGlobalContext } from "../context/GlobalContext";
import { toast } from "react-toastify";

/**
 * The CreatePost component allows users to create new blog posts or edit existing ones.
 * It receives the selected blog data if in edit mode.
 */
const CreatePost = () => {
  // Access the global context to fetch and update blog posts
  const { fetchUserPosts, fetchAllPosts } = useGlobalContext();

  // Access the current route location
  const location = useLocation();

  // Access the navigation object to redirect the user
  const navigate = useNavigate();

  // Access the state passed via Link, which contains the selected blog data if in edit mode
  const selectedBlog = location.state;

  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  // State variables for post input fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Populate input fields with the selected blog data if available (edit mode)
  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog?.title);
      setContent(selectedBlog?.content);
    }
  }, [selectedBlog]);

  // State variable for loading state during form submission
  const [loading, setLoading] = useState(false);

  /**
   * Function to handle form submission when creating or updating a blog post.
   * Performs create logic if no selected blog, otherwise performs edit logic.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform create or update logic based on 'selectedBlog'

    if (selectedBlog) {
      // Edit logic

      setLoading(true);
      try {
        const response = await editBlogPost(selectedBlog?._id, {
          ...selectedBlog,
          title,
          content,
        });

        // Handle response
        if (response.success) {
          toast.success("Blog Edited");
          fetchAllPosts();
          fetchUserPosts();
          navigate("/my-posts");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Error editing blog post");
        setLoading(false);
      }
    } else {
      // Create logic

      if (title && content) {
        setLoading(true);
        const postData = {
          title,
          content,
        };

        try {
          const response = await createBlogPost(postData);

          if (response.success) {
            toast("New Blog created");
            fetchUserPosts();
            fetchAllPosts();
            navigate("/my-posts");
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          toast.error("Error creating blog post");
          setLoading(false);
        }
      } else {
        toast.error("Please fill all details");
      }
    }
  };

  return (
    <div className="h-[75vh] items-center justify-center flex">
      <div className="flex-col p-5 w-[350px] md:w-[550px]">
        <h1 className="text-start text-3xl">
          {!selectedBlog ? "CREATE POST" : "EDIT BLOG"}
        </h1>

        <div className="flex flex-1 flex-col gap-5 md:gap-10 mt-10 ">
          <div className="flex gap-3 flex-col">
            <label className="block font-medium">TITLE</label>
            <input
              type="text"
              className="w-full border rounded px-3 outline-none py-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-col">
            <label className="block font-medium">CONTENT</label>
            <textarea
              className="w-full border rounded px-3 outline-none py-4"
              rows="6"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button
            className={`${
              loading && "lds-dual-ring"
            } " text-white py-3 px-6 font-semibold bg-black flex self-start my-5 rounded-xl "`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "" : !selectedBlog ? "Create" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
