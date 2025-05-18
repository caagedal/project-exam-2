import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Props for the MenuLink component.
 *
 * @typedef {Object} MenuLinkProps
 * @property {string} to - Path to navigate to when the link is clicked.
 * @property {string} label - Text to display for the navigation link.
 * @property {() => void} onClose - Callback to close the parent menu.
 */

/**
 * Renders a navigation link inside a list item.
 * Closes the parent menu when clicked.
 *
 * @param {MenuLinkProps} props - Component props.
 * @returns {JSX.Element} The menu link element.
 */
export default function MenuLink({ to, label, onClose }) {
  return (
    <li>
      <NavLink
        to={to}
        onClick={onClose}
        className="block px-4 py-2 hover:bg-gray-200"
      >
        {label}
      </NavLink>
    </li>
  );
}
