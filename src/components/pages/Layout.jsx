import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollTop';
import Footer from '../Footer';

/**
 * Layout component that wraps pages with common structure: header, footer, and main content.
 * Includes scroll-to-top behavior on route change.
 *
 * @component
 * @returns {JSX.Element} The layout wrapper element.
 */
export default function Layout() {
  return (
    <div className='min-h-svh font-poppins flex-grow max-w-screen-2xl mx-auto'>
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
