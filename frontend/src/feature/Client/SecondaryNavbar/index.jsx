import React from "react";
import { Link } from "react-router-dom";

const ClientNavbar = () => {
  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-lg font-bold text-black">
              Your workspace
            </Link>
            <ul className="flex space-x-6 text-sm">
              <li>
                <a
                  href="#"
                  className="font-bold text-green-500 hover:text-green-500 transition-colors"
                >
                  All Jobs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="font-bold text-green-500 hover:text-green-500 transition-colors"
                >
                  All Contracts
                </a>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <ul className="flex space-x-6">
            <li>
              <Link to="/client/create-job"
               
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Add Job
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
