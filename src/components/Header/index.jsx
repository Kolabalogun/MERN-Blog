import React from "react";
import { toast } from "react-toastify";
import { userLogout } from "../../api";
import avatar from "../../assets/avatar.svg";
import login from "../../assets/login.svg";
import logout from "../../assets/logout.svg";
import eye from "../../assets/eye.svg";
import add from "../../assets/add.svg";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

// The Header component displays the website header containing navigation and user authentication controls.
const Header = () => {
  // Access user and setuser from the global context
  const { user, setuser } = useGlobalContext();

  // Access the navigate function from react-router-dom
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const res = await userLogout();

      console.log(res);
      localStorage.removeItem("userData");

      // Clear user data from the context and navigate to the root path
      setuser(null);

      navigate("/");

      toast.error(res.message); // Display error message using toast
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      {/* Header section */}
      <div className="flex flex-row justify-between items-center xl:px-40 md:px-10 sm:px-10 px-5 py-9">
        {/* Website logo or title */}
        <div>
          <a href="/">
            <h1 className="font-medium text-lg sm:text-[25px] md:text-4xl lg:text-5xl ">
              High Performance Blog
            </h1>
          </a>
        </div>

        <div className="gap-4 flex">
          {/* Conditional rendering based on user authentication */}
          {user ? (
            // If user is logged in
            <div className="flex items-center">
              {/* Dropdown Menu */}
              <div className="py-1 flex">
                {/* Link to create a new post */}
                <Link
                  title="Create Post"
                  to="/create-post"
                  className="px-1 sm:px-4 lg:px-8 py-2"
                  role="menuitem"
                >
                  <img src={add} alt="" className="h-6 md:h-9" />
                </Link>
                {/* Link to view user's posts */}
                <Link
                  title="My Posts"
                  to="/my-posts"
                  className="px-1 sm:px-4 lg:px-8 py-2"
                  role="menuitem"
                >
                  <img src={eye} alt="" className="h-6 md:h-9" />
                </Link>
                {/* Link to update user's profile */}
                <Link
                  title="Update Profile"
                  to="/update-profile"
                  className="px-1 sm:px-4 lg:px-8 py-2"
                  role="menuitem"
                >
                  <img src={avatar} alt="" className="h-6 md:h-9" />
                </Link>
                {/* Button to log out */}
                <button
                  onClick={handleLogout}
                  className="px-1 sm:px-4 lg:px-8 py-2"
                  role="menuitem"
                  title="Log Out"
                >
                  <img src={logout} alt="" className="h-6 md:h-9" />
                </button>
              </div>
            </div>
          ) : (
            // If user is not logged in
            <>
              {/* Link to authentication page */}
              <Link
                title="Log In"
                className="text-black font-medium py-2 px-4 rounded-full"
                to="/auth"
              >
                <img src={login} alt="" className="h-9" />
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
