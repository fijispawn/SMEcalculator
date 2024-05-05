import React, { useState } from 'react';
import styles from './MonthModal.css'

const SelectYearModal = ({ isOpen, onClose, onSelectYear }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Выберите за какой год показать график</h2>
        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button onClick={() => onSelectYear(selectedYear)}>Select</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


export default SelectYearModal;
