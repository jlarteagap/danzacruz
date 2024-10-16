// import React from 'react'
// import Image from 'next/image'
// import Link from 'next/link'
export const Header = () => {
  return (
    <header className="container mx-auto px-4">
      <nav className="flex justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" className="">
          <h1 className="text-3xl font-semibold">Danzacruz</h1>
          <span className="self-center whitespace-nowrap leading-3">
            Festival Internacional de Danza
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        {/* <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a href="#" className="block py-2 px-3" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3">
                  Contact
                </a>
              </li>
            </ul>
          </div> */}
      </nav>
    </header>
  )
}
