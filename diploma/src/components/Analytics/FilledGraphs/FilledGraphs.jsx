import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import Empty from "./Empty";

const FilledGraphs = () => {
  const [dates, setDates] = useState([]);
  const [isValidData, setIsValidData] = useState(false);  

  useEffect(() => {
    fetch('https://enterpizemate.dyzoon.dev/api/analytics/get-costs')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log("Received data:", data);
        if (data && Array.isArray(data.data) && data.data.some(item => item.month && item.year)) {
          setDates(data.data);
          setIsValidData(true);  
        } else {
          setIsValidData(false);  
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setDates([]);
        setIsValidData(false);  
      });
  }, []);

  if (!isValidData) {
    console.log("Rendering Empty component due to invalid data.");
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
