import React, { useState, useEffect } from 'react';
import Modal from './Modal';

/**
 * Data structure for an image in the carousel.
 *
 * @typedef {Object} CarouselImage
 * @property {string} url - The image source URL.
 * @property {string} [alt] - Alternative text for the image.
 */

/**
 * Props for ImageCarouselModal component.
 *
 * @typedef {Object} ImageCarouselModalProps
 * @property {boolean} isOpen - Controls modal visibility.
 * @property {() => void} onClose - Callback to close the modal.
 * @property {CarouselImage[]} images - Array of images to display.
 * @property {number} [initialIndex] - Starting index for the carousel.
 */

/**
 * Displays a modal with a navigable image carousel.
 * Users can navigate through provided images using arrows.
 *
 * @param {ImageCarouselModalProps} props - Component props.
 * @returns {JSX.Element|null} The carousel modal or null if closed.
 */
export default function ImageCarouselModal({ isOpen, onClose, images, initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  /**
   * Navigate to the previous image, wrapping to the end.
   * @param {React.MouseEvent} event - Click event.
   */
  function prevImage(event) {
    event.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  }

  /**
   * Navigate to the next image, wrapping to the start.
   * @param {React.MouseEvent} event - Click event.
   */
  function nextImage(event) {
    event.stopPropagation();
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  }

  if (!isOpen) return null;

  const current = images[currentIndex] || { url: '', alt: `Image ${currentIndex + 1}` };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='relative'>
        <img
          src={current.url}
          alt={current.alt}
          className='w-full h-auto object-contain rounded'
        />
        <button
          onClick={prevImage}
          className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded'
        >
          &#8592;
        </button>
        <button
          onClick={nextImage}
          className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded'
        >
          &#8594;
        </button>
      </div>
    </Modal>
  );
}