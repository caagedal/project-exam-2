import { useState } from "react";

const ImageComponent = ({ src, alt, className = "", onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);
  const placeholderImage = "/full-logo.svg"; 

  return (
    <div className="relative h-full w-full">
      {/* Loading Placeholder */}
      <div
        className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${
          !isLoading && "hidden"
        }`}
      />
      
      {/* Image */}
      <img
        src={src || placeholderImage}
        alt={alt || "Placeholder"}
        {...props}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 cursor-pointer`}
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop if placeholder image also fails
          e.target.src = placeholderImage;
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageComponent;