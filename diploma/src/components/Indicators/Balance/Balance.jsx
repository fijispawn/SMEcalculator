import React, { useState } from "react";
import "../Indicators.css";
import {IndicatorsWrapper} from "../IndicatorsWrapper/IndicatorsWrapper.jsx";


const Balance = () => {
  const [formData, setFormData] = useState({
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    f: "",

  });

  const inputNames = {
    a: "Касса",
    b: "Расчетный счет",
    c: "Денежные резервы",
    d: "Задолженность покупателей",
    e: "Предоплата поставщику",
    f:"Прочие оборотные активы",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 
  return (
    <IndicatorsWrapper activeTab="balance">
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
      <div className="save">
        <button>Календарь</button>
        <button >Сохранить</button>
      </div>
    </IndicatorsWrapper>
  );
};

export default Balance;
