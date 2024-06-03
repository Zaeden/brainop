import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <div className="h-20 flex justify-between items-center px-8 shadow-md">
      {/* <img src={logo} alt="Instagram Logo" className="w-36" /> */}
      <h1 className="w-36 text-3xl font-bold text-hotPink-600">Socially</h1>
      <div className="hidden md:flex space-x-8">
        {isLoggedIn ? (
          <>
            {/* ------------Link to create a post---------- */}
            <Link
              to="/create-post"
              className="text-hotPink-500 font-semibold text-sm py-2"
            >
              Create Post
            </Link>

            {/* -------Link to open user profile--------- */}
            <Link className="text-hotPink-500 font-semibold text-sm py-2">
              Profile
            </Link>

            {/* --------Button to logout out----- */}
            <button
              onClick={handleLogout}
              className="text-hotPink-500 font-semibold text-sm py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="text-hotPink-500 font-semibold text-sm py-2"
            >
              Signup
            </Link>
            <Link className="text-hotPink-500 font-semibold text-sm py-2">
              Signin
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
