import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogOut from "../hooks/useLogout";
// import reactLogo from "../../assets/reactLogo.svg";
import reactLogo from "../assets/react.svg";
import { Button } from "@mui/material";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  const logout = useLogOut();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className=" bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      {/* max-w-6xl */}
      <div className="px-4 mx-auto ">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div className="flex items-center py-5 px-3 text-gray-700 hover:text-gray-900 ">
              <img src={reactLogo} className="w-6 h-6 mr-2" />

              <span className="font-bold">Cropify</span>
            </div>
            {/* Left Nav */}
            <div className="hidden md:flex items-center  space-x-3">
              <Link
                to="/"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950  ${
                  location.pathname === "/" ? "font-bold text-green-800" : ""
                }`}
              >
                Home
              </Link>

              <Link
                to="/crops"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/crops" ? "font-bold opacity-1 " : ""
                }`}
              >
                Crops
              </Link>

              {/* <Link
                to="/contactus"
                className="py-5 px-3 text-gray-700 hover:text-gray-950"
              >
                Contact us
              </Link> */}
              <Link
                to="/aboutus"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/aboutus" ? "font-bold" : ""
                }`}
              >
                About us
              </Link>
              <Link
                to="/ourstores"
                className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                  location.pathname === "/ourstores" ? "font-bold" : ""
                }`}
              >
                Our Stores
              </Link>
              {user && (
                <Link
                  to="/prediction/crop"
                  className={`py-5 px-3 text-gray-700 hover:text-gray-950 ${
                    location.pathname === "/prediction/crop" ? "font-bold" : ""
                  }`}
                >
                  Predictions
                </Link>
              )}
            </div>
          </div>

          {/* Right Nav */}

          <div className="hidden md:flex items-center  space-x-3">
            {user ? (
              <>
                <Link to="/cart" className="py-2 px-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </Link>
                <Button
                  onClick={logout}
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black hover:text-yellow-800 rounded"
                >
                  Logout
                </Button>
                <Link
                  to="/profile"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-black hover:text-yellow-800 rounded"
                >
                  Signup
                </Link>
              </>
            )}
            {/* {user.status === "success" &&
              user.user.role === "admin" && (
                <Link
                  to="/admin/profile"
                  className="py-5 px-3 text-gray-700 hover:text-gray-950"
                >
                  Admin
                </Link>
              )} */}
          </div>

          {/* Drop down button */}
          <div className="md:hidden flex items-center">
            <button onClick={handleMobileMenuToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      {isMobileMenuOpen && (
        <div>
          <Link
            to="/"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Home
          </Link>
          <Link
            to="/crops"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Crops
          </Link>

          {/* <Link
            to="/contactus"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Contact us
          </Link> */}
          <Link
            to="/aboutus"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
          >
            About us
          </Link>
          <Link
            to="/ourstores"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
          >
            Our Stores
          </Link>
          <Link
            to="/prediction/crop"
            className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
            onClick={handleMenuItemClick}
          >
            Predictions
          </Link>
          {user ? (
            <>
              <Link
                to="/logout"
                className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Logout
              </Link>
              <Link
                to="/profile"
                className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-2  text-gray-700 hover:text-gray-950 rounded hover:bg-gray-500"
                onClick={handleMenuItemClick}
              >
                Signup
              </Link>
            </>
          )}
          {/* {user.status === "success" && user.user.role === "admin" && (
            <Link
              to="/admin/profile"
              className="block py-2 px-2 text-gray-700 hover:text-gray-950 hover:bg-gray-500"
              onClick={handleMenuItemClick}
            >
              Admin
            </Link>
          )} */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

{
  /*<nav
      style={{
        padding: "10px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/" style={{ margin: "0 10px" }}>
        Home
      </Link>
      {!user ? (
        <>
          <Link to="/login" style={{ margin: "0 10px" }}>
            Login
          </Link>
          <Link to="/signup" style={{ margin: "0 10px" }}>
            Sign Up
          </Link>
        </>
      ) : (
        <button
          onClick={logout}
          style={{ margin: "0 10px", cursor: "pointer" }}
        >
          Logout
        </button>
      )}
      <Link to="/reviews" style={{ margin: "0 10px" }}>
        Reviews
      </Link>
    </nav>*/
}
