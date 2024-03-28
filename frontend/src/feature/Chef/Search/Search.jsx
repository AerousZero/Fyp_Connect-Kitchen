import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

function SearchInput() {
  return (
    <div className="relative">
      <input type="text" placeholder="Search" className="text-black border-2 border-black rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-400"/>
      <AiOutlineSearch className="h-6 w-6 text-black absolute top-0 right-0 mt-2 mr-2" />
    </div>
  );
}

export default SearchInput;
