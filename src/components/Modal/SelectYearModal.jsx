import React, { useState } from "react";
import styles from "./SelectYearModal.module.css";
import Button from "../Button/Button";

const SelectYearModal = ({ isOpen, onClose, onSelectYear }) => {
  const [selectedYear, setSelectedYear] = useState(""); // Set initial year to an empty string
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() + index);

  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => e.stopPropagation();

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setIsButtonDisabled(false); // Enable the button once a year is selected
  };

  const handleClick = () => {
    onSelectYear(selectedYear);
    onClose(); // Close the modal after selecting the year
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.active : ""}`} onClick={onClose}>
      <div className={styles.content} onClick={handleContentClick}>
        <h2>Выберите за какой год показать график</h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          className={styles.select}
        >
          <option value="">YYYY</option>  {/* Neutral initial option */}
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className={styles.buttons}>
          <Button
            text={selectedYear ? `График за ${selectedYear}` : "Выберите год"}
            disabled={isButtonDisabled}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectYearModal;
