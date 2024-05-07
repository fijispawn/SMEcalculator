import React, { useState, useEffect } from "react";
import "../Indicators.css";
import { IndicatorsWrapper } from "../IndicatorsWrapper/IndicatorsWrapper.jsx";
import Calendar from "../../Modal/Calendar.jsx";
import Button from "../../Button/Button.jsx";
import dayjs from "dayjs";
import MessageModal from "../../Modal/MessageModal.jsx";

const Overhead = ({ location }) => {
  const [modalActive, setModalActive] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showSaveMessageModal, setShowSaveMessageModal] = useState(false);

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

  useEffect(() => {
    if (location.state) {
      const { date } = location.state;
      const parsedDate = dayjs(date);
      setSelectedDate({
        month: parsedDate.format("MMMM"), // Localized month name
        year: parsedDate.format("YYYY")
      });
      setFormData(location.state);
    }
  }, [location.state]);

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

      const monthNumber = dayjs().month(selectedDate.month).format("MM");

      const saveData = {
        ...numericFormData,
        date: `${selectedDate.year}-${monthNumber}-01`, // Ensures correct date format
      };

      fetch("https://enterpizemate.dyzoon.dev/api/analytics/save-costs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.text();
        })
        .then((text) => {
          return text ? JSON.parse(text) : {};
        })
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
          setSaveMessage(`Данные за ${selectedDate.month} ${selectedDate.year} сохранены.`);
          setShowSaveMessageModal(true);
          setTimeout(() => {
            setSaveMessage("");
            setShowSaveMessageModal(false);
          }, 3000);
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
          initialMonth={selectedDate.month}
          initialYear={selectedDate.year}
        />
      </div>
      {saveMessage && <div className="save__message">{saveMessage}</div>}
      <MessageModal
        isActive={showSaveMessageModal}
        onClose={() => setShowSaveMessageModal(false)}
      >
        <p>{saveMessage}</p>
      </MessageModal>
    </IndicatorsWrapper>
  );
};

export default Overhead;
