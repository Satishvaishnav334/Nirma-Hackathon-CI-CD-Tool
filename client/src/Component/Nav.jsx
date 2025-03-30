import React, { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
 
      <nav className="bg-blue-100 m-8  text-slate-900 rounded-lg shadow-xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="font-bold text-3xl shadow-zinc-800">Ascedium</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline  space-x-4">
              <a href="#services" className="px-3 py-2 text-xl rounded-md  font-medium hover:bg-blue-200">
                  Services
                </a>
                <a href="#about" className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-200">
                  About
                </a>
               
                <a href="#contact" className="px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-200">
                  Contact
                </a>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#services" className="block px-3 py-2 rounded-md  text-xl font-medium hover:bg-blue-600">
                Services
              </a>
              <a href="#about" className="block px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-600">
                About
              </a>
              
              <a href="#contact" className="block px-3 py-2 rounded-md text-xl font-medium hover:bg-blue-600">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

  );
}

export default Nav;