import React from "react";
import styles from "./MonthModal.module.css"; 

const SelectYearModal = ({ onSelect, active }) => {
  const years = [2020, 2021, 2022, 2023, 2024]; 
  const handleBackgroundClick = () => {
    onSelect(null); 
  };

  const handleYearClick = (year) => {
    onSelect(year); 
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
        {years.map((year, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectYearModal;
