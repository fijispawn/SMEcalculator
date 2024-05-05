import React from "react";
import "./Modal.css"; // Ensure you have some basic styling for the modal

const MessageModal = ({ isActive, onClose, children }) => {
  if (!isActive) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MessageModal;
