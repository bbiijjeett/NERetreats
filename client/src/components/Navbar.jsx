import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const sidebarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <nav
        className={`flex justify-center items-center ${
          showSidebar ? "hidden" : ""
        }`}
      >
        <div className=" w-[95%] max-w-screen-lg bg-[#fae54d] rounded-full px-6 py-2 md:px-10 md:py-4 mt-2 shadow-xl">
          <div className="flex justify-between items-center">
            <Link to="/">
              <img src={logo} className="h-10" alt="Logo" />
            </Link>

            <div className="md:hidden">
              <button
                className="block text-red-500 focus:outline-none"
                onClick={toggleSidebar}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex gap-10 text-lg items-center font-semibold text-green-600">
              <Link className="hover:text-red-600">Services</Link>
              <Link className="hover:text-red-600">Become A Host</Link>
              <Link
                to="/login"
                onClick={() => {
                  dispatch(setLogout());
                }}
                className="px-4 py-2 rounded-full text-white bg-red-500 hover:bg-green-600"
              >
                Log Out
              </Link>
            </div>
          </div>
          {/* {showSidebar && (
            <div className="md:hidden mt-2">
              <div className="flex flex-col gap-4">
                <Link className="hover:text-green-600">Services</Link>
                <Link className="hover:text-green-600">Become A Host</Link>
                <Link
                  to="/login"
                  onClick={() => {
                    dispatch(setLogout());
                  }}
                  className="px-4 py-2 rounded-full hover:bg-red-500 bg-green-600"
                >
                  Log Out
                </Link>
              </div>
            </div>
          )} */}
        </div>
      </nav>
      {showSidebar && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 md:hidden z-50">
          <div
            ref={sidebarRef}
            className="absolute top-0 left-0 h-full bg-[#fae54d] w-64 p-6 "
          >
            <div className="flex flex-col gap-6">
              <Link to="/" className="flex justify-center items-center">
                <img src={logo} className="h-10" alt="Logo" />
              </Link>

              <Link className="hover:text-green-600 text-red-600 font-semibold">
                Services
              </Link>
              <Link className="hover:text-green-600 text-red-600 font-semibold">
                Become A Host
              </Link>
              <Link
                to="/login"
                onClick={() => {
                  dispatch(setLogout());
                }}
                className="px-4 py-2 rounded-full bg-red-500 hover:bg-green-600 text-white flex justify-center items-center font-semibold"
              >
                Log Out
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
