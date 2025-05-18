import React, { useState } from 'react';
import ImageComponent from './ImageComponent/ImageComponent';
import Modal from '../modals/Modal';

/**
 * Props for the DesktopGallery component.
 *
 * @typedef {Object} DesktopGalleryProps
 * @property {string[]} images - Array of image URLs to display.
 */

/**
 * DesktopGallery displays a responsive image gallery for larger screens.
 * It shows a main image and optional thumbnails. Clicking an image opens it in a modal.
 *
 * @param {DesktopGalleryProps} props - Component props.
 * @returns {JSX.Element} The gallery element for desktop view.
 */
const DesktopGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const mainImage = images[0] || '';
  const hasThumbnails = images.length > 1;

  return (
    <>
      <div className="hidden md:flex gap-4">
        <div className={hasThumbnails ? 'w-2/3' : 'w-full'}>
          <ImageComponent
            src={mainImage}
            alt="Main venue"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            onClick={() => setSelectedImage(mainImage)}
          />
        </div>

        {hasThumbnails && (
          <div className="w-1/3 flex flex-col gap-2">
            {images.slice(1).map((img, index) => (
              <ImageComponent
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-[100px] object-cover rounded-lg shadow-md"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <Modal isOpen onClose={() => setSelectedImage(null)}>
          <img
            src={selectedImage}
            alt="Full size"
            className="w-full rounded-md"
          />
        </Modal>
      )}
    </>
  );
};

export default DesktopGallery;
