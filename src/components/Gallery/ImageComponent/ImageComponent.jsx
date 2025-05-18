import { useState } from 'react';

/**
 * Props for the ImageComponent.
 *
 * @typedef {Object} ImageComponentProps
 * @property {string} src - URL of the image to display.
 * @property {string} alt - Alternative text description for the image.
 * @property {string} [className] - Additional CSS classes to apply to the image.
 * @property {function} [onClick] - Click event handler for the image.
 * @property {Object} [props] - Other image element properties.
 */

/**
 * Displays an image with a loading placeholder and fallback on error.
 * While the image is loading, a pulsing placeholder is shown.
 *
 * @param {ImageComponentProps} props - Component props.
 * @returns {JSX.Element} The image container element.
 */
const ImageComponent = ({ src, alt, className = '', onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeholderImage = '/full-logo.svg';

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${!isLoading && 'hidden'}`}
      />
      <img
        src={src || placeholderImage}
        alt={alt || 'Image placeholder'}
        {...props}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 cursor-pointer`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageComponent;
