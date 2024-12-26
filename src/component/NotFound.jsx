import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-500 mt-2">
          It might have been removed or the URL might be incorrect.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-yellow-500 text-white py-2 px-6 rounded-lg text-lg shadow-lg hover:bg-yellow-600 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

     
    </div>
  );
};

export default NotFound;
