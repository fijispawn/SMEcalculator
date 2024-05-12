import React from "react";
import styles from "./MonthModal.module.css"; 

const months = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const MonthModal = ({ onSelect, active, onClose }) => {
  const handleBackgroundClick = () => {
    onClose();
  };

  const handleMonthClick = (month) => {
    onSelect(month);
  };

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={handleBackgroundClick} 
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()} 
      >
        {months.map((month, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => handleMonthClick(month)} 
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthModal;
