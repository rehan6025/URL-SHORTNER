import React from "react";
import { Link } from "@tanstack/react-router";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              URL Shortener
            </Link>
          </div>

          <div className="flex items-center">
            {/* {isLoggedIn ? (
              <>
                <span className="text-gray-700 mr-4">Welcome, {userName}!</span>
                <button
                  onClick={onLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:transform hover:scale-103    transition duration-300"
              >
                Login
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
