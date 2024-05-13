import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Empty from "./Empty";

const FilledGraphs = ({ setHasData, onEdit }) => {
  const [dates, setDates] = useState({});

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-costs")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log("Received data:", data);
        setDates(data);
        setHasData(Object.keys(data).length > 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDates({});
        setHasData(false);
      });
  }, [setHasData]);

  // useEffect(() => {
  //   const mockData = {
  //     "2024-03-01": {
  //       ads: 3,
  //       bonus: 3,
  //       date: "2024-03-01",
  //       login: "1@mail.ru",
  //       patent: 3,
  //       rent: 3,
  //       salary: 3,
  //       salaryTaxes: 3,
  //       summ: 21,
  //       taxes: 3,
  //     },
  //     "2024-04-01": { summ: 310, date: "2024-04-01" },
  //     "2025-01-01": { summ: 410, date: "2025-01-01" },
  //     "2025-02-01": { summ: 510, date: "2025-02-01" },
  //     "2026-03-01": { summ: 610, date: "2026-03-01" },
  //     "2026-04-01": { summ: 710, date: "2026-04-01" },
  //   };

  //   setDates(mockData);
  //   setHasData(Object.keys(mockData).length > 0);
  // }, [setHasData]);

  if (Object.keys(dates).length === 0) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(dates).map(([date, details], index) => (
        <div key={index} className={styles.container}>
          <span className="text-left">{date}</span>
          <div
            onClick={() => onEdit({ date, ...details })}
            className={styles.edit}
          >
            <MdEdit /> Изменить
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilledGraphs;
