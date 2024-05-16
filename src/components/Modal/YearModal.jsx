import React from "react";
import styles from "./MonthModal.module.css"; 

const YearModal = ({ onSelect, active, onClose }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index); 

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={onClose} 
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {years.map((year) => (
          <button
            key={year}
            className={styles.button}
            onClick={() => onSelect(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearModal;
