import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { Link } from "react-router-dom";

function Navigation() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { mode, points, setMode, userData } = useStore();

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const toggleMoblieMenu = () => {
    setMobileMenuVisible(!isMobileMenuVisible);
  };
  const navigate = useNavigate();

  return (
    <nav className="bg-white">
      <div className="mx-4 px-2 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div
              className="flex-shrink-0"
              onClick={() => {
                navigate("/");
              }}
            >
              <img className="h-32 w-32" alt="Toad House" />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center ml-4 md:ml-6">
              {mode === "guest" && (
                <div className="hidden md:block">
                  <div className="flex items-baseline ml-10 space-x-4">
                    <Link
                      to="/"
                      className="block px-3 py-2 text-base font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
                    >
                      SELLER LOGIN
                    </Link>
                    <Link
                      to="/"
                      className="block px-3 py-2 text-base font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
                    >
                      BUYER LOGIN
                    </Link>
                    <Link
                      to="/"
                      className="block px-3 py-2 text-base font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
                    >
                      SIGN UP
                    </Link>
                  </div>
                </div>
              )}
              {mode !== "guest" && (
                <div className="flex items-center ml-4 md:ml-6">
                  <span className="px-3 py-2 text-sm font-medium rounded-md text-black-300">
                    Welcome,{" "}
                    <span className="font-bold">{userData.nickname}</span>
                  </span>
                  <span className="px-3 py-2 text-sm font-bold text-green-300 rounded-md">
                    {`${points}P`}
                  </span>
                  <button
                    type="button"
                    className="relative p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">View notifications</span>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </button>
                </div>
              )}

              {mode !== "guest" && (
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded={isMenuVisible}
                      aria-haspopup="true"
                      onClick={toggleMenu}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                    </button>
                  </div>
                  {isMenuVisible && (
                    <div
                      className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                      id="navbar-menu-box"
                    >
                      <Link
                        to="/points"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Points
                      </Link>
                      <Link
                        to="/history/material"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-1"
                      >
                        History
                      </Link>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                        onClick={() => setMode("guest")}
                      >
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex -mr-2 md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center p-2 rounded-md"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuVisible}
              id="mobile-menu-button"
              aria-haspopup="true"
              onClick={toggleMoblieMenu}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuVisible && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/"
              className="block px-3 py-2 text-sm font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
            >
              SELLER LOGIN
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-sm font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
            >
              BUYER LOGIN
            </a>
            <a
              href="/"
              className="block px-3 py-2 text-sm font-medium rounded-md text-black-300 hover:bg-gray-700 hover:text-white"
            >
              SIGN UP
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="w-10 h-10 rounded-full" alt="user" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-black">
                  Welcome, <span className="font-bold">junns</span>
                </div>
                <div className="mt-1 text-sm font-bold leading-none text-green-300">
                  400P
                </div>
              </div>
              <button
                type="button"
                className="relative flex-shrink-0 p-1 ml-auto text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
            </div>
            <div className="px-2 mt-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Your Profile
              </a>
              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Settings
              </a>
              <a
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-400 rounded-md hover:bg-gray-700 hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
