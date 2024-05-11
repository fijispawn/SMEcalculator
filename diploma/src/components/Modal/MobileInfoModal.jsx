import React from "react";
import styles from "./MobileInfoModal.module.css";

const MobileInfoModal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={isOpen ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={onClose}  
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};

export default MobileInfoModal;
