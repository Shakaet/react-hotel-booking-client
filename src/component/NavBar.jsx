import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider"; // Make sure the path is correct

const Navbar = () => {
  const { user, signOuts } = useContext(AuthContext); 
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };// Get user and signOut function from context

  return (
    // <nav className="bg-blue-500 p-4">
    //   <div className="container mx-auto flex items-center justify-between">
    //     <div>
    //       <h1 className="text-white text-2xl font-bold">
    //         <Link to="/">Hotel Booking</Link>
    //       </h1>

          
    //     </div>
    //     <ul className="flex space-x-6">
    //       {user ? (
    //         <>
    //          <li>
    //             <Link
    //               to="/"
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               Home
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/myrooms"
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               Rooms
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/mybooking"
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               My Bookings
    //             </Link>
    //           </li>
    //           <li>
    //             <button
    //               onClick={signOuts} // Call signOut function to log out
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               Logout
    //             </button>
    //           </li>
    //         </>
    //       ) : (
    //         <li className="flex space-x-6 items-center">
               
    //             <Link
    //               to="/"
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               Home
    //             </Link>
                
    //             <Link
    //               to="/myrooms"
    //               className="text-white hover:text-gray-300 font-medium"
    //             >
    //               Rooms
    //             </Link>
              
              
    //           <Link
    //             to="/login"
    //             className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
    //           >
    //             Login
    //           </Link>
    //         </li>
    //       )}
    //     </ul>
    //   </div>
    // </nav>

    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div>
          <h1 className="text-white text-2xl font-bold">
            <Link to="/">Hotel Booking</Link>
          </h1>
        </div>

        {/* Desktop/Tablet Navigation */}
        <div className="hidden md:flex space-x-6">
          {user ? (
            <>
              <Link
                to="/"
                className="text-white hover:text-gray-300 font-medium"
              >
                Home
              </Link>
              <Link
                to="/myrooms"
                className="text-white hover:text-gray-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                to="/mybooking"
                className="text-white hover:text-gray-300 font-medium"
              >
                My Bookings
              </Link>
              <button
                onClick={signOuts}
                className="text-white hover:text-gray-300 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:text-gray-300 font-medium"
              >
                Home
              </Link>
              <Link
                to="/myrooms"
                className="text-white hover:text-gray-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                to="/login"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"} bg-blue-500`}
      >
        <div className="flex flex-col space-y-4 p-4">
          {user ? (
            <>
              <Link
                to="/"
                className="text-white hover:text-gray-300 font-medium"
              >
                Home
              </Link>
              <Link
                to="/myrooms"
                className="text-white hover:text-gray-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                to="/mybooking"
                className="text-white hover:text-gray-300 font-medium"
              >
                My Bookings
              </Link>
              <button
                onClick={signOuts}
                className="text-white hover:text-gray-300 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-white hover:text-gray-300 font-medium"
              >
                Home
              </Link>
              <Link
                to="/myrooms"
                className="text-white hover:text-gray-300 font-medium"
              >
                Rooms
              </Link>
              <Link
                to="/login"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
