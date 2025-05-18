import React from 'react';
import DesktopGallery from './DesktopGallery';
import MobileGallery from './MobileGallery';

/**
 * Props for the VenueGallery component.
 *
 * @typedef {Object} VenueGalleryProps
 * @property {string[]} images - List of image URLs to display in the gallery.
 */

/**
 * VenueGallery renders both desktop and mobile galleries based on viewport.
 * It passes the provided image URLs to each gallery component.
 *
 * @param {VenueGalleryProps} props - Component props.
 * @returns {JSX.Element} The responsive image gallery container.
 */
const VenueGallery = ({ images }) => (
  <div className="mx-auto">
    <DesktopGallery images={images} />
    <MobileGallery images={images} />
  </div>
);

export default VenueGallery;
