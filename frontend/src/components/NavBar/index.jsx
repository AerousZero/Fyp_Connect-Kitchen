import React from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/userSlice";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);
  // const { profile, isLoading, error } = useUser();

  // console.log(profile, "pofofofo")

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search logic here
    console.log("Searching...");
  };

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-lg font-bold text-green-500">
              Connect Kitchen
            </Link>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-green-500 transition-colors"
                >
                  Find Work
                </a>
              </li>
             {userDetails.user?.role?.name === "chef" ? (
                <li>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-green-500 transition-colors"
                  >
                    My Works
                  </a>
                </li>
              ) : (
                <li>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-green-500 transition-colors"
                  >
                    Talents
                  </a>
                </li>
              )}

              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-green-500 transition-colors"
                >
                 Reports
                </a>
              </li>

               <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-green-500 transition-colors"
                >
                 Message
                </a>
              </li>
            </ul>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right side */}
          <ul className="flex space-x-6">
            {userDetails.isAuthenticated ? (
              <li className="flex items-center space-x-4">
                <img
                  src={userDetails.avatar || null}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-800 text-sm">
                  {userDetails.user?.firstName}
                </span>
              </li>
            ) : (
              <>
                <li>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-green-500 transition-colors"
                  >
                    Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Sign Up
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
