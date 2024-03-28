import React from 'react';
import chef from '../../assets/chef.png';

const Banner = () => {
  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="max-w-md lg:mr-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 lg:mb-4">Find Your Next Job</h2>
          <p className="text-lg lg:text-xl text-gray-600 mb-4">Discover lots of work options for freelancers and chefs.</p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg font-semibold shadow-md transition duration-300">
            Explore Jobs
          </button>
        </div>
        <div className="hidden lg:block max-w-sm">
          <img src={chef} alt="Chef" className="w-100 h-200" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
