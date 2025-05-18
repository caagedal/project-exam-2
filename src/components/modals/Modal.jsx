import React from 'react';
import { createPortal } from 'react-dom';

/**
 * Props for Modal component.
 *
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Controls whether the modal is visible.
 * @property {() => void} onClose - Callback invoked to close the modal.
 * @property {React.ReactNode} children - Content to render inside the modal.
 */

/**
 * Renders a modal overlay using a React portal. Clicking the backdrop or the Close button
 * will invoke the onClose callback.
 *
 * @param {ModalProps} props - Component props.
 * @returns {JSX.Element|null} The modal element or null if not open.
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  /**
   * Handles clicks on the backdrop to close the modal.
   * Only triggers onClose if the backdrop itself is clicked.
   *
   * @param {React.MouseEvent<HTMLDivElement>} event - Click event.
   */
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;

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
    modalRoot
  );
}
