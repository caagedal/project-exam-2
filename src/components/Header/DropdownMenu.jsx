import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuLink from './MenuLink';
import useAuthStore from '../../js/store/useAuthStore';

/**
 * Props for DropdownMenu component.
 *
 * @typedef {Object} DropdownMenuProps
 * @property {boolean} isOpen - Indicates whether the dropdown is open.
 * @property {() => void} onClose - Callback to close the dropdown.
 */

/**
 * Renders a dropdown menu with navigation links and logout functionality.
 *
 * @param {DropdownMenuProps} props - Component props.
 * @returns {JSX.Element|null} The dropdown menu element or null if closed.
 */
function DropdownMenu({ isOpen, onClose }) {
  const { user, isVenueManager, logout } = useAuthStore();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Handles clicks outside the menu to close it.
     *
     * @param {MouseEvent} event - The mouse event.
     */
    function handleClickOutside(event) {
      const toggleButton = event.target.closest('button[aria-label="Dropdown menu"]');
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !toggleButton
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  /**
   * Logs out the user, closes the menu, and redirects to home.
   */
  function handleLogout() {
    logout();
    onClose();
    navigate('/');
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={menuRef}
      className="absolute top-full right-0 bg-white shadow-md p-4 rounded z-50 mt-2 min-w-[200px] text-neutral-dark"
    >
      <nav>
        <ul className="space-y-2">
          <MenuLink to="/" label="Home" onClose={onClose} />
          <MenuLink to={`/profile/${user?.name}`} label="Profile" onClose={onClose} />
          {isVenueManager && (
            <MenuLink
              to={`/profile/${user?.name}/venue-manager`}
              label="Manager Dashboard"
              onClose={onClose}
            />
          )}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:text-red-800 hover:bg-gray-50 rounded font-semibold"
            >
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default DropdownMenu;
