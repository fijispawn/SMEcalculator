import React from "react";
import styles from "./FilledGraphs.module.css";

const Empty = () => {
  return (
    <div className={styles.fake}>
        Отсутствуют заполненные данные! Перейдите во вкладку 'Показатели' для заполнения данных.
    </div>
  );
};

export default Empty;
