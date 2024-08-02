import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";

export default function NavBar({ title, login }) {
  const [isOpen, setIsOpen] = useState(false);

  const navigateTo = useNavigate();

  const navigateToStudentForm = () => {
    navigateTo("/student-form");
  };

  const navigateToStudentDetails = () => {
    navigateTo("/student-details");
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          {login == true ? (
            <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src={viteLogo} alt="Logo" />
                <span className="ml-2 text-xl font-semibold">{title}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}>
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                  <svg
                    className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Logo and text */}
              <div className="flex-1 flex items-center justify-start sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-auto" src={viteLogo} alt="Logo" />
                  <span className="ml-2 text-xl font-semibold">{title}</span>
                </div>
              </div>

              {/* Desktop menu */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                <button
                  className="hover:text-blue-600"
                  onClick={navigateToStudentForm}>
                  Add
                </button>
                <button
                  className="hover:text-blue-600"
                  onClick={navigateToStudentDetails}>
                  Student Details
                </button>
                <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            className="text-sky-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            onClick={navigateToStudentForm}>
            Add
          </button>
          <button
            className="text-sky-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
            onClick={navigateToStudentDetails}>
            Student Details
          </button>
          <button className="bg-sky-500 text-white hover:bg-blue-600 block px-3 py-2 rounded-md text-base font-medium">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
