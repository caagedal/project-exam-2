import React from 'react';

/**
 * Footer component for the Holidaze website.
 * Displays the current year and copyright information.
 *
 * @component
 * @returns {JSX.Element} The footer element for the site.
 */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {year} Holidaze. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
