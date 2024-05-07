import React, { useState } from "react";
import styles from "./SelectYearModal.module.css";
import Button from "../Button/Button";

const SelectYearModal = ({ isOpen, onClose, onSelectYear }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => e.stopPropagation();

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setIsButtonDisabled(false); 
  };

  const handleClick = () => {
    onSelectYear(selectedYear);
    onClose(); 
  };

  return (
    <div className={`${styles.modal} ${isOpen ? styles.active : ""}`} onClick={onClose}>
      <div className={styles.content} onClick={handleContentClick}>
        <h2>Выберите за какой год показать график</h2>
        <select value={selectedYear} onChange={handleYearChange} className={styles.select}>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <div className={styles.buttons}>
          <Button text={`График за ${selectedYear}`} disabled={isButtonDisabled} onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
};

export default SelectYearModal;
