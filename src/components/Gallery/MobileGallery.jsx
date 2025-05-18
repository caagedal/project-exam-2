import React, { useState } from 'react';
import ImageComponent from './ImageComponent/ImageComponent';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Modal from '../modals/Modal';

/**
 * Props for the MobileGallery component.
 *
 * @typedef {Object} MobileGalleryProps
 * @property {string[]} images - Array of image URLs to display.
 */

/**
 * MobileGallery displays a carousel of images for mobile view.
 * Users can navigate through images using arrows and open an image in a modal.
 *
 * @param {MobileGalleryProps} props - Component props.
 * @returns {JSX.Element} The gallery element for mobile view.
 */
const MobileGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const hasMultiple = images.length > 1;
  const currentImage = images[currentIndex] || '';

  /**
   * Advance to the next image, wrapping to the start.
   */
  const nextImage = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  /**
   * Go back to the previous image, wrapping to the end.
   */
  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="relative md:hidden w-full">
        <ImageComponent
          src={currentImage}
          alt="Current venue"
          className="w-full h-[300px] object-cover rounded-xl shadow-lg"
          onClick={() => setSelectedImage(currentImage)}
        />

        {hasMultiple && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </>
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

export default MobileGallery;
