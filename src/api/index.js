import axios from "axios";
import { toast } from "react-toastify";

// API EndPoint
const APIUrl = "http://localhost:3004";

// Post URLs
const api = axios.create({
  baseURL: `${APIUrl}/api/posts`, // API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// User URLs
const userUrl = `${APIUrl}/api/users`;
const userApi = axios.create({
  baseURL: userUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// User-related utility functions
export const userRegister = async (userData) => {
  try {
    const response = await userApi.post(`/`, userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const userLogin = async (credentials) => {
  try {
    const response = await userApi.post(`/login`, credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getUserProfile = async () => {
  try {
    const response = await userApi.get(`/currentUser`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const editUserProfile = async (userData) => {
  try {
    const response = await userApi.put("/update-profile", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const userLogout = async () => {
  try {
    const response = await userApi.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Blog-related utility functions
export const fetchAllBlogPosts = async () => {
  try {
    const response = await api.get(`/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserBlogPosts = async (userId) => {
  try {
    const response = await api.get(`/${userId}/posts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBlogPost = async (blogData) => {
  try {
    const response = await api.post(`/`, blogData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const editBlogPost = async (blogId, blogData) => {
  try {
    const response = await api.patch(`/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteBlogPost = async (blogId) => {
  console.log(blogId);
  try {
    const response = await api.delete(`/${blogId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with a status code other than 2xx
    console.log("Server Error Response Data:", error.response.data);
    toast.error(error.response.data.message);
    console.log("Server Error Response Status:", error.response.status);
  } else if (error.request) {
    // The request was made but no response was received
    console.log("Request Error:", error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error Message:", error.message);
  }
};
