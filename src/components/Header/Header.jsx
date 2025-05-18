import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuthStore from '../../js/store/useAuthStore';
import DropdownMenu from './DropdownMenu';
import { Menu } from 'lucide-react';

/**
 * Header component for Holidaze.
 * Displays logo, navigation links, and user menu when logged in.
 *
 * @component
 * @returns {JSX.Element} The rendered header element.
 */
function Header() {
  const { isLoggedIn } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Toggles dropdown menu open state.
   */
  const handleMenuClick = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <header className="bg-[var(--color-white)]">
      <div className="flex justify-between items-center max-w-screen-2xl py-4 px-4 mx-auto text-[var(--color-neutral-dark)]">
        <NavLink to="/">
          <img
            src="/full-logo.svg"
            alt="Holidaze logo"
            className="h-15"
          />
        </NavLink>

        {!isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <NavLink to="/register" className="px-4 py-2">
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className="bg-[var(--color-blue-main)] text-[var(--color-white)] px-4 py-2 rounded"
            >
              Login
            </NavLink>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={handleMenuClick}
              className="flex items-center space-x-2 bg-[var(--color-blue-main)] text-[var(--color-white)] px-4 py-2 rounded"
              aria-label="Dropdown menu"
              aria-expanded={isDropdownOpen}
            >
              <Menu className="text-2xl" />
            </button>
            <DropdownMenu
              isOpen={isDropdownOpen}
              onClose={() => setIsDropdownOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
