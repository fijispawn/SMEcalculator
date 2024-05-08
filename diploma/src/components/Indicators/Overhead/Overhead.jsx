import React, { useState, useEffect } from "react";
import "../Indicators.css";
import { useLocation } from "react-router-dom";
import { IndicatorsWrapper } from "../IndicatorsWrapper/IndicatorsWrapper.jsx";
import Calendar from "../../Modal/Calendar.jsx";
import Button from "../../Button/Button.jsx";
import dayjs from "dayjs";
import MessageModal from "../../Modal/MessageModal.jsx";

const Overhead = () => {
  const location = useLocation(); // Using the hook to get location

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

  const monthMap = {
    январь: "01",
    февраль: "02",
    март: "03",
    апрель: "04",
    май: "05",
    июнь: "06",
    июль: "07",
    август: "08",
    сентябрь: "09",
    октябрь: "10",
    ноябрь: "11",
    декабрь: "12",
  };

  const getMonthNumber = (monthName) => {
    return monthMap[monthName.toLowerCase()] || "01";  // default to January if not found
  };

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
      const { date, ...rest } = location.state;
      const parsedDate = dayjs(date);
      setSelectedDate({
        month: parsedDate.format("MMMM"), // Localized month name
        year: parsedDate.format("YYYY"),
      });
      const editableFields = Object.keys(rest).reduce((obj, key) => {
        if (key in inputNames) {
          obj[key] = String(rest[key]); // Ensure all values are strings
        }
        return obj;
      }, {});
      setFormData(editableFields);
    }
  }, [location]);

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
    
        // Directly use numerical values or convert from a map if using names
        const monthNumber = getMonthNumber(selectedDate.month);  // This needs to be defined based on your app's logic
        const dateString = `${selectedDate.year}-${monthNumber}-01`;
        const formattedDate = dayjs(dateString, "YYYY-MM-DD").isValid() ? dateString : "Invalid Date";
    
        const saveData = {
          ...numericFormData,
          date: formattedDate,
        };
    
        fetch("https://enterpizemate.dyzoon.dev/api/analytics/save-costs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveData),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.text();
        })
        .then(text => {
          return text ? JSON.parse(text) : {};
        })
        .then(data => {
          console.log("Success:", data);
          Object.keys(formData).forEach(key => formData[key] = "");
          setSaveMessage(`Data for ${selectedDate.month} ${selectedDate.year} saved.`);
          setShowSaveMessageModal(true);
          setTimeout(() => {
            setSaveMessage("");
            setShowSaveMessageModal(false);
          }, 3000);
        })
        .catch(error => {
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
