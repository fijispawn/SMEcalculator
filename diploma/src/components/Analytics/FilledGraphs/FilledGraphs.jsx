import React from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";

const FilledGraphs = () => {
  return (
    <div className={styles.wrapper}>
      {/* 1 */}
     <div className={styles.container}>
        <span  className="text-left">Январь 2024</span>
        <div className="flex justify-end items-center">
          <MdEdit /> Изменить
        </div>
     </div>
     {/* 2 */}
     <div className={styles.container}>
        <span className="text-left">Февраль 2024</span>
        <div className="flex justify-end items-center">
          <MdEdit /> Изменить
        </div>
     </div>
     {/* 3 */}
     <div className={styles.container}>
        <span className="text-left">Март 2024</span>
        <div className="flex justify-end items-center">
          <MdEdit /> Изменить
        </div>
     </div>
     {/* 4 */}
     <div className={styles.container}>
        <span className="text-left">Апрель 2024</span>
        <div className="flex justify-end items-center">
          <MdEdit /> Изменить
        </div>
     </div>
     {/* 5 */}
     <div className={styles.container}>
        <span className="text-left">Май 2024</span>
        <div className="flex justify-end items-center">
          <MdEdit /> Изменить
        </div>
     </div>
    </div>
  );
};

export default FilledGraphs;
