import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Power2 } from 'gsap/all';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // GSAP animation for navigation links
    if (window.Shery && typeof window.Shery.makeMagnet === 'function') {
      window.Shery.makeMagnet('.megnet');
    }

    // Check if the token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // Set the user as authenticated
    }
  }, []);

  // Function to log out the user
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update the state to reflect logged-out status
  };

  // Function to close the mobile menu when a link is clicked
  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="megnet flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">FileCov</h1>
            </div>
            {isAuthenticated ? (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/home"
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Home
                </Link>
                <div
                  className="relative "
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link
                    to="#"
                    className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 leading-12 font-medium"
                  >
                    Tools
                  </Link>
                  {isDropdownOpen && (
                    <div className="absolute mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                      <div className="grid grid-cols-2 gap-4 p-4">
                        <Link to="/img_to_pdf" className="text-gray-700 hover:text-gray-900 block text-sm">
                          IMG to PDF
                        </Link>
                        <Link to="/DocxToPdf" className="text-gray-700 hover:text-gray-900 block text-sm">
                          Word To PDF
                        </Link>
                        <Link to="/ppt_to_pdf" className="text-gray-700 hover:text-gray-900 block text-sm">
                          PPT To PDF
                        </Link>
                        <Link to="/Xltopdf" className="text-gray-700 hover:text-gray-900 block text-sm">
                          Excel To PDF
                        </Link>
                        <Link to="/PdfToImages" className="text-gray-700 hover:text-gray-900 block text-sm">
                          PDF To Img
                        </Link>
                        <Link to="/Pdftodocx" className="text-gray-700 hover:text-gray-900 block text-sm">
                          PDF To Word
                        </Link>
                        <Link to="/pdftopptx" className="text-gray-700 hover:text-gray-900 block text-sm">
                          PDF To PPT
                        </Link>
                        <Link to="/Imgtodocx" className="text-gray-700 hover:text-gray-900 block text-sm">
                          IMG To Docx
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  to="/mergePdf"
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Merge PDF
                </Link>
                <Link
                  to="/ContactPage"
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            ) : null}
          </div>

          {/* Authentication Buttons at the End of Navbar */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="ml-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          {isAuthenticated ? (
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/converters"
                onClick={handleMobileMenuClick}
                className="block pl-3 pr-4 py-2 border-l-4 border-purple-500 text-base font-medium text-purple-700 bg-purple-50 focus:outline-none focus:text-purple-800 focus:bg-purple-100 focus:border-purple-700 transition"
              >
                Converters
              </Link>
              <div>
                <button
                  onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                  className="block w-full pl-3 pr-4 py-2 text-left border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
                >
                  Tools
                </button>
                {isMobileDropdownOpen && (
                  <div className="pl-3 pr-4 py-2">
                    <Link to="/img_to_pdf" onClick={handleMobileMenuClick} className="block text-gray-700 hover:text-gray-900 text-sm">
                      IMG to PDF
                    </Link>
                    <Link to="/DocxToPdf" onClick={handleMobileMenuClick} className="block text-gray-700 hover:text-gray-900 text-sm">
                      Word To PDF
                    </Link>
                    {/* More links here */}
                  </div>
                )}
              </div>
              <Link
                to="/ContactPage"
                onClick={handleMobileMenuClick}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
              >
                Contact
              </Link>
            </div>
          ) : (
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/signup"
                onClick={handleMobileMenuClick}
                className="block pl-3 pr-4 py-2 border-l-4 border-purple-500 text-base font-medium text-purple-700 bg-purple-50"
              >
                Sign up
              </Link>
              <Link
                to="/login"
                onClick={handleMobileMenuClick}
                className="ml-4 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
