import React, {useState} from "react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../store/userSlice";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

import {DownOutlined} from "@ant-design/icons"

const Navbar = () => {
  const userDetails = useSelector(selectUserDetails);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
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
              <li className="relative">
                <button className="flex items-center space-x-2" onClick={toggleDropdown}>
                  <img
                    src={userDetails.avatar || null}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800 text-sm">
                    {userDetails.user?.firstName}
                  </span>
                  <DownOutlined />
                </button>
                {isDropdownOpen && (
                  <ul className="absolute bg-white shadow-md rounded-md w-40 top-10 right-0 z-10">
                    <li>
                      <Link
                        to="/client/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={closeDropdown}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                        onClick={closeDropdown}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
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
