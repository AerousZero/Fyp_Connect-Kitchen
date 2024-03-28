import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

const Card = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [projectName, setProjectName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [requirements, setRequirements] = useState("");

  // Simulating data fetching with setTimeout
  useEffect(() => {
    const fetchData = () => {
      // Simulated delay of 2 seconds
      setTimeout(() => {
        setProjectName("Sample Project");
        setLocation("New York, USA");
        setPrice("$1000");
        setRequirements("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et enim a elit sodales hendrerit vel id nisi.");
        setIsLoading(false); // Set loading to false after data fetching
      }, 60000);
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto bg-white shadow-md rounded border border-2-black overflow-hidden">
      {isLoading ? ( 
        <Loader />
      ) : (
        <div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{projectName}</div>
            <div className="flex items-center mb-4">
              <svg className="w-4 h-4 fill-current text-gray-500 mr-2" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2.5a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 1a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 5a.5.5 0 11-.001 1.001A.5.5 0 0110 8.5zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zM7 8a1 1 0 000 2h6a1 1 0 000-2H7z"/>
              </svg>
              <p className="text-gray-700 text-sm">{location}</p>
            </div>
            <div className="flex items-center mb-4">
              <svg className="w-4 h-4 fill-current text-gray-500 mr-2" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 1a9 9 0 100-18 9 9 0 000 18zm0-9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zM9 8a1 1 0 10-2 0v1a1 1 0 102 0V8zm4 0a1 1 0 10-2 0v1a1 1 0 102 0V8z"/>
              </svg>
              <p className="text-gray-700 text-sm">{price}</p>
            </div>
            <p className="text-gray-700 text-base mb-4">{requirements}</p>
          </div>
          <div className="px-6 py-2">
            <Tag label="#Tag1" />
            <Tag label="#Tag2" />
            <Tag label="#Tag3" />
          </div>
        </div>
      )}
    </div>
  );
}

const Tag = ({ label }) => (
  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    {label}
  </span>
);

export default Card;
