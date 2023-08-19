import React, { useState } from "react";

import { useGlobalContext } from "../../context/GlobalContext";

const Blogs = () => {
  const { posts } = useGlobalContext();

  // State to keep track of expanded state for each blog
  const [expandedBlogs, setExpandedBlogs] = useState({});

  // Function to handle expanding and collapsing of blog content
  const handleShowFullText = (blogId) => {
    setExpandedBlogs((prevExpandedBlogs) => ({
      ...prevExpandedBlogs,
      [blogId]: !prevExpandedBlogs[blogId],
    }));
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
  const sortedUserPosts = posts?.slice().sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="flex flex-col gap-16 max-w-3xl mx-auto px-5 my-24">
      {/* Iterate through blog posts */}
      {sortedUserPosts?.map((post) => (
        <div key={post?._id} className="flex gap-2 flex-col">
          <div className="mb-0">
            {/* Blog title */}
            <h1 className="md:text-[3.8em] md:leading-[60px] text-3xl uppercase font-semibold">
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
