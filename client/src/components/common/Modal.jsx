import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

import "./Modal.css";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={`modal modal-${size}`}>
        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;