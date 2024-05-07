import React, { useState } from "react";
import styles from "./Calendar.module.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import MonthModal from "./MonthModal";
import YearModal from "./YearModal";

const Calendar = ({ active, setActive, updateDate, initialMonth, initialYear }) => {
  const [modalActive, setModalActive] = useState(false);
  const [yearModalActive, setYearModalActive] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth || "Месяц");
  const [selectedYear, setSelectedYear] = useState(initialYear || "Год");

  const handleClose = () => setActive(false);

  const handleSelectMonth = (month) => {
    setSelectedMonth(month);
    setModalActive(false);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setYearModalActive(false);
  };

  const handleSave = () => {
    updateDate(selectedMonth, selectedYear);
    setActive(false);
  };

  const isSaveDisabled = selectedMonth === "Месяц" || selectedYear === "Год";

  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={handleClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container}>
          <FaRegCalendarAlt className="text-[30px]" />
          <h1>Календарь</h1>
        </div>
        <span> Выберите месяц и год <br/>внесения данных:</span>
        <div className={styles.button_container}>
          <button
            className={styles.button}
            onClick={() => setModalActive(true)}
          >
            {selectedMonth}
          </button>
          <button
            className={styles.button}
            onClick={() => setYearModalActive(true)}
          >
            {selectedYear}
          </button>
        </div>
        <MonthModal active={modalActive} onSelect={handleSelectMonth} />
        <YearModal active={yearModalActive} onSelect={handleSelectYear} />
        <button
          className={`${styles.save} ${
            isSaveDisabled ? styles.disabled : ""
          }`}
          onClick={handleSave}
          disabled={isSaveDisabled}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Calendar;
