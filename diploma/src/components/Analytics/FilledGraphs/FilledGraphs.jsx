import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import Empty from "./Empty";

const FilledGraphs = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch('https://enterpizemate.dyzoon.dev/api/analytics/get-costs')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:", data);
        if (Array.isArray(data)) {
          setDates(data);
        } else {
          console.error('Expected an array but received:', data);
          setDates([]);  
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setDates([]);  
      });
  }, []);

  if (dates.length === 0) {
    return <Empty />;  
  }

  return (
    <div className={styles.wrapper}>
      {dates.map((date, index) => (
        <div key={index} className={styles.container}>
          <span className="text-left">{`${date.month} ${date.year}`}</span>
          <div className="flex justify-end items-center">
            <MdEdit /> Изменить
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilledGraphs;
