import React, { useState } from "react";
import styles from "./SelectYearModal.module.css";
import Button from "../Button/Button";


const SelectYearModal = ({ isOpen, onClose, onSelectYear }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from(
    { length: 10 },
    (_, index) => new Date().getFullYear() + index
  );

  if (!isOpen) {
    return null;
  }

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${styles.modal} ${isOpen ? styles.active : ""}`}
      onClick={onClose}
    >
      <div className={styles.content} onClick={handleContentClick}>
        <h2 className="w-[200px]">
          Выберите за какой год показать график 
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={styles.select}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className={styles.buttons}>
          <button className="w-[200px]" onClick={() => onSelectYear(selectedYear)}>Выбрать</button>
        </div>
      </div>
    </div>
  );
};

export default SelectYearModal;
