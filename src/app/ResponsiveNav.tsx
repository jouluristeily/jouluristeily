'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const ResponsiveNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { href: '/', label: 'JR 2024' },
    { href: '/tuplis', label: 'Tuplis' },
    { href: '/terms', label: 'Matkaehdot' },
    { href: '/guide', label: 'Ohjeet' },
    // { href: '/events', label: 'Ohjelma' },
    { href: '/gallery', label: 'Galleria' },
    { href: '/prices', label: 'Hinnasto' },
    { href: '/loimu', label: 'Loimu' },
    { href: '/afterlecture', label: 'After Lecture' },
    {
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSfTOWaBsXQxybeHYtfB4-Z-BxP2dG0hGVumIHt_7J2VVpyQ_Q/viewform',
      label: 'Häirintäilmoitus',
    },
  ];

  return (
    <>
      <nav
        className={'relative w-full z-20 top-0 left-0 dark:border-gray-600'}
        style={{ outline: '5px dashed yellow', boxShadow: '0 0 0 5px red' }}
      >
        <div className="max-w-full flex flex-wrap items-center justify-between p-4">
          <Link href="/" className="flex items-center">
            <img src="/icon.svg" className="h-8 mr-3" alt="Jouluristeily icon" />
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-200"
              onClick={handleDrawerToggle}
              aria-controls="navbar-sticky"
              aria-expanded={mobileOpen}
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="red"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              mobileOpen ? '' : 'hidden'
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium text-black border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
              {navItems.map((item, i) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`block py-2 pl-3 pr-4 ${
                      mobileOpen
                        ? 'text-black rounded  md:hover:bg-transparent  md:p-0 md:dark:hover:text-red-500  hover:bg-red-500 dark:hover:text-white md:dark:hover:bg-transparent '
                        : `font-semibold text-2xl rounded md:bg-transparent text-red-600 md:p-0 ${
                            i < 6 ? 'visible' : 'sm:hidden sm:visible'
                          }`
                    } font-title`}
                    onClick={() => {
                      setMobileOpen(false); // Close the mobile menu when an item is clicked
                    }}
                    aria-current={mobileOpen ? undefined : 'page'}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ResponsiveNav;
