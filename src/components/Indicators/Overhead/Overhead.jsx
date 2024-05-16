import React, { useState, useEffect } from "react";
import "../Indicators.css";
import { useLocation } from "react-router-dom";
import { IndicatorsWrapper } from "../IndicatorsWrapper/IndicatorsWrapper.jsx";
import Calendar from "../../Modal/Calendar.jsx";
import Button from "../../Button/Button.jsx";
import dayjs from "dayjs";
import MessageModal from "../../Modal/MessageModal.jsx";
import "dayjs/locale/ru"; // import Russian locale

dayjs.locale("ru"); // use Russian locale globally

const Overhead = () => {
  const location = useLocation();

  const [modalActive, setModalActive] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showSaveMessageModal, setShowSaveMessageModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    month: "", // Start empty, will use default prompt in Calendar if empty
    year: "", // Start empty
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
    patent: "Прочие оборотные активы",
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

  const handleSave = () => {
    if (selectedDate.month && selectedDate.year) {
      const numericFormData = Object.keys(formData).reduce((acc, key) => {
        acc[key] = formData[key] ? Number(formData[key]) : 0;
        return acc;
      }, {});

      // Convert month name to number using the map
      const monthNumber = monthMap[selectedDate.month.toLowerCase()];
      const dateString = `${selectedDate.year}-${monthNumber}-01`;
      const formattedDate = dayjs(dateString, "YYYY-MM-DD").isValid()
        ? dateString
        : "Invalid Date";

      if (formattedDate === "Invalid Date") {
        console.error("Invalid date formed:", dateString);
        return;
      }

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
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok. Status: ${response.status}`
            );
          }
          return response.text(); // Change here: using text() to handle empty responses
        })
        .then((text) => {
          // Only parse if there is content
          const data = text ? JSON.parse(text) : {};
          console.log("Success:", data);
          setSaveMessage(
            `Данные за ${selectedDate.month} ${selectedDate.year} сохранены.`
          );
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
            placeholder="Введите значение в тыс. руб."
            value={formData[key]}
            onChange={handleChange}
          />
        </React.Fragment>
      ))}
      <div className="button__container">
      <Button
        text={`${selectedDate.month || "Календарь"} ${
          selectedDate.year || ""
        }`.trim()}
        onClick={() => setModalActive(true)}
      />
      <Button
        text="Сохранить"
        onClick={handleSave}
        disabled={!selectedDate.month || !selectedDate.year}
      />
      <Calendar
        active={modalActive}
        setActive={setModalActive}
        updateDate={updateDate}
        initialMonth={selectedDate.month}
        initialYear={selectedDate.year}
      />
    </div>
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
