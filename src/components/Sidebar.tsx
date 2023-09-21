// CustomSidebar.jsx
import React from 'react';
import { navItems } from './DrawerAppBar'; // Import your navigation items array

interface CustomSidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

type NavigationItem = {
  href: string;
  label: string;
};

const CustomSidebar = ({ mobileOpen, handleDrawerToggle }: CustomSidebarProps) => {
  return (
    <div
      className={`${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-300 transform transition-transform ease-in-out duration-300`}
    >
      {/* Your mobile sidebar content */}
      <div className="p-4">
        <ul>
          {navItems.map((item: NavigationItem) => (
            <li key={item.label} className="py-2">
              <a
                href={item.href}
                className="text-black font-semibold hover:bg-gray-200 block px-4 py-2"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomSidebar;
