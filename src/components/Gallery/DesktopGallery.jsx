import React, { useState } from "react";
import ImageComponent from "./ImageComponent/ImageComponent";

import Modal from "../modals/Modal";

const DesktopGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="hidden md:flex gap-4">
        <div className={`${images.length > 1 ? "w-2/3" : "w-full"}`}>
          <ImageComponent
            src={images[0]}
            alt="Main Venue"
            className="w-full h-[400px] object-cover rounded-xl shadow-lg"
            onClick={() => setSelectedImage(images[0])} // Open modal only on click
          />
        </div>

        {images.length > 1 && (
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

      {/* Modal should only open when an image is clicked */}
      {selectedImage && (
        <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full Size" className="w-full rounded-md" />
        </Modal>
      )}
    </>
  );
};

  
  export default DesktopGallery;
