import React from 'react';
import { Link } from 'react-router-dom';

function JoinOptions() {
  return (
    <div className="max-w-lg mx-auto  p-6 bg-white rounded-lg ">
      <h2 className="text-xl text-center font-bold mb-4">Would you like to join  ?</h2>
      <ul className="space-y-2">
        <li>
          <Link
            to="/register/chef"
            className="join-button"
          >
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors focus:outline-none">
           Join as Freelance Chef
          </button>
          </Link>
          
        </li>
        <li>
          <Link
            to="/register/client"
            className="join-button"
          >
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors focus:outline-none">
            Join as Client
          </button>
          </Link>
          
        </li>
        
      </ul>
    </div>
  );
}

export default JoinOptions;
