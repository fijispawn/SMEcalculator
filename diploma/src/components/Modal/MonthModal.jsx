import React from "react";
import styles from "./MonthModal.module.css"; // Adjust the path as necessary

const months = [
  "Январь", "Февраль", "Март", "Апрель",
  "Май", "Июнь", "Июль", "Август",
  "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

const MonthModal = ({ onSelect, active }) => {
  // Define the handler for clicking outside the modal content
  const handleBackgroundClick = () => {
    onSelect(null); // Assuming onSelect(null) is the way to close the modal by design
  };

  // Improved click handler for selecting a month that also closes the modal
  const handleMonthClick = (month) => {
    onSelect(month);
  };

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={handleBackgroundClick} // This handles clicks on the background
    >
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()} // Prevent background click action when clicking on the content
      >
        {months.map((month, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => handleMonthClick(month)} // Use the specific handler for month selection
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthModal;
