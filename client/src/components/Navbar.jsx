// import React, { useEffect, useRef, useState } from "react";
// import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const sidebarRef = useRef(null);
//   const [showSidebar, setShowSidebar] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setShowSidebar(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <>
//       <nav
//         className={`flex justify-center items-center ${
//           showSidebar ? "hidden" : ""
//         }`}
//       >
//         <div className=" w-[95%] max-w-screen-lg bg-[#fae54d] rounded-full px-6 py-2 md:px-10 md:py-4 mt-2 shadow-xl">
//           <div className="flex justify-between items-center">
//             <Link to="/">
//               <img src={logo} className="h-10" alt="Logo" />
//             </Link>

//             <div className="md:hidden">
//               <button
//                 className="block text-red-500 focus:outline-none"
//                 onClick={toggleSidebar}
//               >
//                 <svg
//                   className="w-6 h-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16m-7 6h7"
//                   />
//                 </svg>
//               </button>
//             </div>
//             <div className="hidden md:flex gap-10 text-lg items-center font-semibold text-green-600">
//               <Link className="hover:text-red-600">Services</Link>
//               <Link className="hover:text-red-600">Become A Host</Link>
//               <Link
//                 to="/login"
//                 onClick={() => {
//                   dispatch(setLogout());
//                 }}
//                 className="px-4 py-2 rounded-full text-white bg-red-500 hover:bg-green-600"
//               >
//                 Log Out
//               </Link>
//             </div>
//           </div>
//           {/* {showSidebar && (
//             <div className="md:hidden mt-2">
//               <div className="flex flex-col gap-4">
//                 <Link className="hover:text-green-600">Services</Link>
//                 <Link className="hover:text-green-600">Become A Host</Link>
//                 <Link
//                   to="/login"
//                   onClick={() => {
//                     dispatch(setLogout());
//                   }}
//                   className="px-4 py-2 rounded-full hover:bg-red-500 bg-green-600"
//                 >
//                   Log Out
//                 </Link>
//               </div>
//             </div>
//           )} */}
//         </div>
//       </nav>
//       {showSidebar && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 md:hidden z-50">
//           <div
//             ref={sidebarRef}
//             className="absolute top-0 left-0 h-full bg-[#fae54d] w-64 p-6 "
//           >
//             <div className="flex flex-col gap-6">
//               <Link to="/" className="flex justify-center items-center">
//                 <img src={logo} className="h-10" alt="Logo" />
//               </Link>

//               <Link className="hover:text-green-600 text-red-600 font-semibold">
//                 Services
//               </Link>
//               <Link className="hover:text-green-600 text-red-600 font-semibold">
//                 Become A Host
//               </Link>
//               <Link
//                 to="/login"
//                 onClick={() => {
//                   dispatch(setLogout());
//                 }}
//                 className="px-4 py-2 rounded-full bg-red-500 hover:bg-green-600 text-white flex justify-center items-center font-semibold"
//               >
//                 Log Out
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import logo from "../assets/logo.png";
import { IconButton } from "@mui/material";
import { Person, Search, Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <nav className="relative h-[10vh] bg-white w-full flex justify-between px-10 py-10 items-center gap-10">
      <Link to="/">
        <img src={logo} className="h-10  cursor-pointer" alt="Logo" />
      </Link>
      <div className="px-5 hidden lg:flex items-center gap-10 h-12 border-[1px] border-red-500 rounded-3xl ">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none outline-none"
        />
        <IconButton>
          <Search sx={{ color: "#F8395A" }} />
        </IconButton>
      </div>
      <div className="flex items-center gap-10">
        {user ? (
          <Link
            to="/create-listing"
            className="text-lg font-semibold  hover:text-[#F8395A] cursor-pointer hidden sm:block"
          >
            Become A Host
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-lg hover:text-[#F8395A] font-semibold cursor-pointer"
          >
            Become A Host
          </Link>
        )}

        <button
          onClick={() => setDropdownMenu(!dropdownMenu)}
          className=" p-2 rounded-full bg-white border-[2px] border-[#969393] flex items-center gap-2 "
        >
          <Menu sx={{ color: "#969393" }} className="" />
          {!user ? (
            <Person sx={{ color: "#969393" }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="Profile"
              className="rounded-full object-cover h-8"
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="bg-white absolute top-20 p-2 right-3 flex flex-col items-center rounded-md gap-2">
            <Link to="/login" className="px-2 hover:text-blue-400">
              Log In
            </Link>

            <Link to="/register" className="px-2 hover:text-blue-400">
              Sign Up
            </Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="bg-white top-20 right-12 p-2 font-medium absolute flex flex-col items-center rounded-md gap-2">
            <Link className="hover:text-blue-500" to={`/${user._id}/trips`}>
              Trip List
            </Link>
            <Link className="hover:text-blue-500" to={`/${user._id}/wishlist`}>
              Wish List
            </Link>
            <Link
              className="hover:text-blue-500"
              to={`/${user._id}/properties`}
            >
              Property List
            </Link>
            <Link
              className="hover:text-blue-500"
              to={`/${user._id}/reservations`}
            >
              Reservation List
            </Link>
            <Link className="hover:text-blue-500" to="/create-listing">
              Become A Host
            </Link>

            <Link
              className="hover:text-red-500"
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
