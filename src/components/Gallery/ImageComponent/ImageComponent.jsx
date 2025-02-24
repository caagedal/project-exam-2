import { useState } from "react";

const ImageComponent = ({ src, alt, className = "", onClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      
      <div
        className={`absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700 ${
          !isLoading && "hidden"
        }`}
      />
      
    
      <img
        src={src}
        alt={alt}
        {...props}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300 cursor-pointer`}
        onLoad={() => setIsLoading(false)}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageComponent;
