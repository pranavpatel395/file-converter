// Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Power2 } from 'gsap/all'; // Ensure you import Power2 easing function

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    // GSAP animation for navigation links
  

    // Ensure the Shery object is available before using it
    if (window.Shery && typeof window.Shery.makeMagnet === 'function') {
      window.Shery.makeMagnet(".megnet");
    }
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="megnet flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">FileCov</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <div
                className="relative pt-5"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  to="#"
                  className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 leading-12 font-medium"
                >
                  Tools
                </Link>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <Link to="/img_to_pdf" className="text-gray-700 hover:text-gray-900 block text-sm">IMG to PDF</Link>
                      <Link to="/DocxToPdf" className="text-gray-700 hover:text-gray-900 block text-sm">Word To PDF</Link>
                      <Link to="/ppt_to_pdf" className="text-gray-700 hover:text-gray-900 block text-sm">PPT To PDF</Link>
                      <Link to="/Xltopdf" className="text-gray-700 hover:text-gray-900 block text-sm">Excel To PDF</Link>
                      <Link to="/PdfToImages" className="text-gray-700 hover:text-gray-900 block text-sm">PDF To Img</Link>
                      <Link to="/Pdftodocx" className="text-gray-700 hover:text-gray-900 block text-sm">PDF To Word</Link>
                      <Link to="/pdftopptx" className="text-gray-700 hover:text-gray-900 block text-sm">PDF To PPT</Link>
                      <Link to="#" className="text-gray-700 hover:text-gray-900 block text-sm">PDF To Excel</Link>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/mergePdf"
                className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Merge PDF
              </Link>
              {/* <Link
                to="/Edit"
                className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Edit
              </Link> */}
              {/* <Link
                to="/sign"
                className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Sign
              </Link> */}
              <Link
                to="/ContactPage"
                className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="#"
              className=" text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              Sign up
            </Link>
            <Link
              to="#"
              className=" ml-4 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Log in
            </Link>
          </div>
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
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/converters"
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
                  <Link to="/img_to_pdf" className="block text-gray-700 hover:text-gray-900 text-sm">IMG to PDF</Link>
                  <Link to="/DocxToPdf" className="block text-gray-700 hover:text-gray-900 text-sm">Word To PDF</Link>
                  <Link to="/ppt_to_pdf" className="block text-gray-700 hover:text-gray-900 text-sm">PPT To PDF</Link>
                  <Link to="/Xltopdf" className="block text-gray-700 hover:text-gray-900 text-sm">Excel To PDF</Link>
                  <Link to="#" className="block text-gray-700 hover:text-gray-900 text-sm">PDF To Img</Link>
                  <Link to="/Pdftodocx" className="block text-gray-700 hover:text-gray-900 text-sm">PDF To Word</Link>
                  <Link to="/pdftopptx" className="block text-gray-700 hover:text-gray-900 text-sm">PDF To PPT</Link>
                  <Link to="#" className="block text-gray-700 hover:text-gray-900 text-sm">PDF To Excel</Link>
                </div>
              )}
            </div>
            <Link
              to="#"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              Pricing
            </Link>
            <Link
              to="#"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              API
            </Link>
            <Link
              to="#"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition"
            >
              Contact
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <Link
                to="#"
                className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              >
                Sign up
              </Link>
              <Link
                to="#"
                className="ml-4 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-base font-medium"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
