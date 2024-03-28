import React from "react";

function Loader() {
  return (
    <div className="animate-pulse p-4">
      <div className="h-6 bg-gray-400 rounded mb-2"></div>
      <div className="h-4 bg-gray-400 rounded mb-2"></div>
      <div className="h-4 bg-gray-400 rounded"></div>
    </div>
  );
}

export default Loader;
