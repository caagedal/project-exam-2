import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="mt-6 text-center text-xs text-gray-500">
        &copy; {year} Holidaze. All rights reserved.
      </div>
    </footer>
  );
}
