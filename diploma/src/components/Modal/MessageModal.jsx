import React from "react";
import "./MessageModal.css"; 

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
