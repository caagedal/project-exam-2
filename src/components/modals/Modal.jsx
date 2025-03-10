import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center bg-neutral-dark/50 z-50" 
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-screen-md w-full m-4">
        {children}
        <button 
          onClick={onClose} 
          className="w-full mt-4 py-3 text-white bg-green hover:bg-green/90 rounded-2xl transition-colors"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

