import React, { useState } from "react";
import "../Indicators.css";
import { IndicatorsWrapper } from "../IndicatorsWrapper/IndicatorsWrapper.jsx";
import Calendar from "../../Modal/Calendar.jsx";
import Button from "../../Button/Button.jsx";

const Overhead = () => {
  const [modalActive, setModalActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    month: "Календарь",
    year: "",
  });
  const [formData, setFormData] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",
    g: "",
  });

  const inputNames = {
    a: "Зарплата сотрудникам",
    b: "Доплаты сотрудникам",
    c: "Зарплатные налоги",
    d: "Аренда помещения",
    e: "Реклама",
    f: "Налоги",
    g: "Патент",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateDate = (month, year) => {
    setSelectedDate({ month, year });
  };

  const isSaveDisabled =
    Object.values(formData).every((value) => value.trim() === "") ||
    selectedDate.month === "Календарь" ||
    selectedDate.year === "";

  return (
    <IndicatorsWrapper activeTab="overhead">
      <div className="grid__form">
        {Object.keys(formData).map((key, index) => (
          <React.Fragment key={index}>
            <div className="naming__style">{inputNames[key]}</div>
            <input
              name={key}
              placeholder="Введите значение в руб."
              value={formData[key]}
              onChange={handleChange}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="button__container">
        <Button
          text={`${selectedDate.month} ${selectedDate.year}`}
          onClick={() => setModalActive(true)}
        />
        <Button text="Сохранить" disabled={isSaveDisabled} />
        <Calendar
          active={modalActive}
          setActive={setModalActive}
          updateDate={updateDate}
        />
      </div>
    </IndicatorsWrapper>
  );
};

export default Overhead;
