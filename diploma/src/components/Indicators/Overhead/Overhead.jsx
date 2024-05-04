import React, { useState } from "react";
import "../Indicators.css";
import { IndicatorsWrapper } from "../IndicatorsWrapper/IndicatorsWrapper.jsx";
import Calendar from "../../Modal/Calendar.jsx";
import Button from "../../Button/Button.jsx";
import dayjs from "dayjs";

const Overhead = () => {
  const [modalActive, setModalActive] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [selectedDate, setSelectedDate] = useState({
    month: "Календарь",
    year: "",
  });
  const [formData, setFormData] = useState({
    salary: "",
    bonus: "",
    salaryTaxes: "",
    rent: "",
    ads: "",
    taxes: "",
    patent: "",
  });

  const inputNames = {
    salary: "Зарплата сотрудникам",
    bonus: "Доплаты сотрудникам",
    salaryTaxes: "Зарплатные налоги",
    rent: "Аренда помещения",
    ads: "Реклама",
    taxes: "Налоги",
    patent: "Патент",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const updateDate = (month, year) => {
    setSelectedDate({ month, year });
  };

  const isSaveDisabled =
    Object.values(formData).every((value) => value.trim() === "") ||
    selectedDate.month === "Календарь" ||
    selectedDate.year === "";

  const handleSave = () => {
    if (!isSaveDisabled) {
      const numericFormData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = formData[key] ? Number(formData[key]) : 0;
        return acc;
      }, {});

      const monthNamesToNumbers = {
        Январь: 1,
        Февраль: 2,
        Март: 3,
        Апрель: 4,
        Май: 5,
        Июнь: 6,
        Июль: 7,
        Август: 8,
        Сентябрь: 9,
        Октябрь: 10,
        Ноябрь: 11,
        Декабрь: 12,
      };

      const monthNumber = monthNamesToNumbers[selectedDate.month] || 0;

      const saveData = {
        formData: {
          ...numericFormData,
          date: dayjs(`${selectedDate.year}-${monthNumber}`).format("YYYY-MM-DD"),
        },
      };

      fetch("https://enterpizemate.dyzoon.dev/api/analytics/save-costs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setFormData({
            salary: "",
            bonus: "",
            salaryTaxes: "",
            rent: "",
            ads: "",
            taxes: "",
            patent: "",
          });
          setSelectedDate({ month: "Календарь", year: "" });
          setSaveMessage(
            `Данные за ${selectedDate.month} ${selectedDate.year} сохранены.`
          );
          setTimeout(() => setSaveMessage(""), 3000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

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
        <Button
          text="Сохранить"
          onClick={handleSave}
          disabled={isSaveDisabled}
        />

        <Calendar
          active={modalActive}
          setActive={setModalActive}
          updateDate={updateDate}
        />
      </div>
      {saveMessage && <div className="save__message">{saveMessage}</div>}
    </IndicatorsWrapper>
  );
};

export default Overhead;
