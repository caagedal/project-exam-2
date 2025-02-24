import React, { useState } from "react";
import ImageComponent from "./ImageComponent/ImageComponent";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Modal from "../modals/Modal";


const MobileGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
  
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevImage = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <>
        <div className="relative md:hidden w-full">
          <ImageComponent
            src={images[currentIndex]}
            alt="Venue"
            className="w-full h-[300px] object-cover rounded-xl shadow-lg"
            onClick={() => setSelectedImage(images[currentIndex])}
          />
  
          {/* Venstre pil */}
          {images.length > 1 && (
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              onClick={prevImage}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}
  
          {/* Høyre pil */}
          {images.length > 1 && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
              onClick={nextImage}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}
  
          {/* Indikator-prikker */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
                ></div>
              ))}
            </div>
          )}
        </div>
  
        {/* Modal for stort bilde */}
        <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full Size" className="w-full rounded-md" />
        </Modal>
      </>
    );
  };
  
  export default MobileGallery;