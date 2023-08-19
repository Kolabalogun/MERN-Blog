import React, { useState, useEffect } from "react";
import editImg from "../../assets/edit.svg";
import deleteImg from "../../assets/trash.svg";

import { deleteBlogPost } from "../../api";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { toast } from "react-toastify";

const Blogs = () => {
  const { setLoading, user, userPosts, fetchUserPosts } = useGlobalContext();

  // State to keep track of expanded state for each blog
  const [expandedBlogs, setExpandedBlogs] = useState({});

  // Function to handle expanding and collapsing of blog content
  const handleShowFullText = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) => ({
      ...prevExpandedBlogs,
      [blogId]: !prevExpandedBlogs[blogId],
    }));
  };

  // Function to handle deletion of a blog post
  const handleDeleteBlogPost = async (id) => {
    setLoading(true);
    try {
      const response = await deleteBlogPost(id);
      console.log(response); // Handle response

      if (response.success) {
        toast.error("Post Deleted");
      }

      // Refresh the list after successful deletion
      fetchUserPosts();
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  // Function to convert date and time format
  const convertDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const dateObject = new Date(dateTimeString);
    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  // Sort userPosts by createdAt in descending order
  const sortedUserPosts = userPosts?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="flex flex-col gap-16 max-w-3xl px-5   mx-auto my-24">
      {/* Iterate through blog posts */}
      {sortedUserPosts?.map((post) => (
        <div key={post?._id} className="flex gap-2 flex-col">
          <div className="mb-0">
            {/* Blog title */}
            <h1 className="md:text-[3.8em] md:leading-[60px] text-3xl  uppercase font-semibold">
              {post?.title}
            </h1>
          </div>
          <span className="text-[13px]">
            {/* Author */}
            {post?.author}
          </span>
          <div className="flex gap-5 items-center text-xs font-bold uppercase mb-2">
            <span>
              {/* Convert and display creation date */}
              {convertDateTime(post?.createdAt)}
            </span>
            {user && (
              <div className="flex gap-4">
                {/* Edit blog icon */}

                <Link state={post} to="/edit-post">
                  <span className="cursor-pointer">
                    <img src={editImg} className="h-4" alt="edit btn" />
                  </span>
                </Link>
                {/* Delete blog icon */}
                <span
                  onClick={() => handleDeleteBlogPost(post?._id)}
                  className="cursor-pointer"
                >
                  <img src={deleteImg} className="h-4" alt="delete btn" />
                </span>
              </div>
            )}
          </div>
          <div className="">
            {/* Display truncated/full blog content */}
            <p>
              {expandedBlogs[post._id]
                ? post?.content
                : `${post?.content?.substring(0, 200)}....`}
            </p>
          </div>
          <div className="mt-1">
            {/* Toggle "See Less" or "Read More" button */}
            <button
              className="font-semibold text-xs"
              onClick={() => handleShowFullText(post._id)}
            >
              {expandedBlogs[post._id] ? "See Less" : "Read More..."}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
