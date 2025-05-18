import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuLink from "./MenuLink";
import useAuthStore from "../../js/store/useAuthStore";

/**
 * DropdownMenu component
 * 
 * @component
 * @param {boolean} isOpen - Is the dropdown open?
 * @param {Function} onClose - Function to close dropdown
 */
export default function DropdownMenu({ isOpen, onClose }) {
  const { user, isVenueManager, logout } = useAuthStore();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const isToggleButton = event
        .target.closest('button[aria-label="Dropdown menu"]');
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !isToggleButton
      ) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();        // Clear auth state
    onClose();       // Close the dropdown
    navigate("/");   // Redirect to home page
  };

  if (!isOpen) return null;

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