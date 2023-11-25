"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

const NavLinks: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const routeSegment = useSelectedLayoutSegment();
  const links = [
    { label: "Home", path: "/" },
    { label: "Admin Panel", path: "/admin-panel" },
    { label: "feature 1", path: "/feature1" },
    { label: "feature 2", path: "/feature2" },
    { label: "feature 3", path: "/feature3" }
  ];
  const activeLinkClasses =
    "block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600";
  const linkClasses =
    "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  return (
    <>
      <button
        data-collapse-toggle='navbar-hamburger'
        type='button'
        className='md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
        aria-controls='navbar-hamburger'
        aria-expanded='false'
        onClick={() => setVisible((prev) => !prev)}
      >
        <span className='sr-only'>Open main menu</span>
        <svg
          className='w-5 h-5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 17 14'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M1 1h15M1 7h15M1 13h15'
          />
        </svg>
      </button>
      <div className={`w-full md:block md:w-auto ${visible ? "" : "hidden"}`}>
        <ul className='flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 md:space-x-1 md:flex-row md:mt-0 md:border-0 md:bg-transparent md:dark:bg-transparent rtl:space-x-reverse'>
          {links.map(({ label, path }) => {
            const checkPath = path === "/" ? null : path.substring(1);
            return (
              <li key={path}>
                <Link
                  href={path}
                  className={
                    routeSegment === checkPath ? activeLinkClasses : linkClasses
                  }
                  onClick={() => setVisible(false)}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default NavLinks;
