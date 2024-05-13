import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Empty from "./Empty";

const FilledBalance = ({ setHasData, onEdit }) => {
  const [dates, setDates] = useState({});

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-balance")
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

//   useEffect(() => {
//     const mockData = {
//       "2024-03-01": {
//         fund: 3,
//         bankAccount: 3,
//         date: "2024-03-01",
//         login: "1@mail.ru",
//         clientDebt: 3,
//         reserves: 3,
//         upFrontPayment: 3,
//         otherAssets: 3,
//         calculate: 2,
//         requiredPayments: 20,
//       },
//       "2024-04-01": { calculate: 310, date: "2024-04-01" },
//       "2025-01-01": { calculate: 410, date: "2025-01-01" },
//       "2025-02-01": { calculate: 510, date: "2025-02-01" },
//       "2026-03-01": { calculate: 610, date: "2026-03-01" },
//       "2026-04-01": { calculate: 710, date: "2026-04-01" },
//     };

//     setDates(mockData);
//     setHasData(Object.keys(mockData).length > 0);
//   }, [setHasData]);

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

export default FilledBalance;
