import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

import Empty from "./Empty";

const FilledGraphs = () => {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDates({});
      });
  }, []);

  if (Object.keys(dates).length === 0) {
    console.log("Rendering Empty component because no dates data.");
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(dates).map(([date, details], index) => (
        <div key={index} className={styles.container}>
          <span className="text-left">{date}</span>
          <div className="flex justify-end items-center">
            <MdEdit /> Изменить
            <FaTrashAlt />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilledGraphs;
