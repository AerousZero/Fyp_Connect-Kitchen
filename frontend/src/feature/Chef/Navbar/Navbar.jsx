import React from 'react';
import { Link } from 'react-router-dom';
import SearchInput from '../Search/Search';

function Navbar() {
  return (
    <nav className="">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-sm  font-semibold">Kitchen Connect</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-black  text-sm  font-semibold hover:text-blue-500">Find Work</Link>
          <Link to="/" className="text-black text-sm  font-semibold hover:text-blue-500">My Works</Link>
          <SearchInput />
          <Link to="/profile" className="text-black text-sm  font-semibold hover:text-blue-500">Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
