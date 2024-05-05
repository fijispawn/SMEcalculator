import React from "react";
import styles from "./MessageModal.module.css"; 

const MessageModal = ({ isActive, onClose, children }) => {
  if (!isActive) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default MessageModal;
