import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-blue-400 border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      <span className="absolute text-lg font-medium text-blue-600 mt-24">
        Loading...
      </span>
    </div>
  );
};

export default LoadingSpinner;