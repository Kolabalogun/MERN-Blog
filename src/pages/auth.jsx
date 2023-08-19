import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  editUserProfile,
  getUserProfile,
  userLogin,
  userRegister,
} from "../api";

import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Auth = () => {
  const { setuser } = useGlobalContext();

  // State variables for user input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // State variable for loading state during authentication
  const [loading, setLoading] = useState(false);

  // State variable for page type; login, registration, or update
  const [type, setType] = useState("login");

  // Access the navigate object
  const navigate = useNavigate();

  const location = useLocation();

  const [userProfileData, setUserProfileData] = useState(false);

  // Determine the type based on the URL path
  useEffect(() => {
    if (location.pathname === "/update-profile") {
      setType("update");
    }
  }, [location]);

  // Fetch user profile data if in update mode
  useEffect(() => {
    if (type === "update") {
      const handleGetUserProfile = async () => {
        try {
          // Fetch user profile data
          const res = await getUserProfile();
          console.log(res);
          setUserProfileData(res.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      handleGetUserProfile();
    }
  }, [type]);

  // Populate input fields with user profile data if available
  useEffect(() => {
    if (userProfileData) {
      setEmail(userProfileData?.email);
      setFirstName(userProfileData?.firstName);
      setLastName(userProfileData?.lastName);
    }
  }, [userProfileData]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login, registration, or update logic based on 'type'
    if (type === "login") {
      // Perform login logic

      if (email && password) {
        setLoading(true);
        try {
          const response = await userLogin({
            email,
            password,
          });

          // Update user data and store in local storage
          setuser(response.data._id);
          localStorage.setItem("userData", response.data._id);
          if (response.success) {
            toast("Login Successful");
            navigate("/");
          }

          setLoading(false);
        } catch (error) {
          console.log(error);

          setLoading(false);
        }

        setEmail("");
        setPassword("");
      } else {
        toast.error("Please fill all details");
      }
    } else if (type === "register") {
      // Perform registration logic

      if (email && password && firstName && lastName) {
        setLoading(true);
        const userData = {
          email,
          firstName,
          lastName,
          password,
        };

        try {
          const response = await userRegister(userData);

          if (response.success) {
            toast("Registration Successful");
            // Change type to login for auto-switching
            setType("login");
          }

          console.log(response); // Handle response
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      } else {
        toast.error("Please fill all details");
      }
    } else {
      // Perform profile update logic
      if (userProfileData) {
        setLoading(true);
        try {
          const response = await editUserProfile({
            email,
            firstName,
            lastName,
          });
          console.log(response); // Handle response

          if (response.success) {
            toast("Profile Updated");
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    }
  };

  return (
    <div className="min-h-[75vh] items-center justify-center flex">
      <div className="flex-col flex">
        {/* Display different title based on 'type' */}
        <h1 className="text-start text-3xl">
          {type === "update"
            ? "UPDATE ACCOUNT"
            : type === "register"
            ? "CREATE ACCOUNT"
            : "LOGIN"}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center mt-10">
          <div className="flex flex-col gap-5 md:gap-10">
            {/* Show first name and last name fields for registration and update */}
            {(type === "register" || type === "update") && (
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-col">
                  <label className="block font-medium">FIRST NAME</label>
                  <input
                    type="text"
                    className="w-[400px] border rounded px-3 outline-none py-4 md:py-10"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="flex-col md:ml-4">
                  <label className="block font-medium">LAST NAME</label>
                  <input
                    type="text"
                    className="w-[400px] border rounded px-3 outline-none py-4 md:py-10"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
            )}
            {/* Email and password fields */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-col flex flex-1">
                <label className="block font-medium">EMAIL</label>
                <input
                  type="email"
                  className={`w-[400px] border rounded px-3 outline-none py-4 md:py-10 ${
                    type === "update" ? "w-full " : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* Show password field only for login and registration */}
              {type !== "update" && (
                <div className="flex-col md:ml-4">
                  <label className="block font-medium">PASSWORD</label>
                  <input
                    type="password"
                    className="w-[400px] border rounded px-3 outline-none py-4 md:py-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button
          className={`${
            loading && "lds-dual-ring"
          } " text-white py-3 px-6 font-semibold bg-black flex self-start my-5 rounded-xl "`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? ""
            : type === "update"
            ? "Update"
            : type === "register"
            ? "Sign Up"
            : "Login"}
        </button>

        {/* Switch between login and registration */}
        {type === "login" ? (
          <p className="text-[13px] mt-5">
            Don't have an account?{" "}
            <span
              className="cursor-pointer font-medium"
              onClick={() => setType("register")}
            >
              Register
            </span>
          </p>
        ) : (
          type === "register" && (
            <p className="text-[13px] mt-5">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-medium"
                onClick={() => setType("login")}
              >
                Login
              </span>
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Auth;
