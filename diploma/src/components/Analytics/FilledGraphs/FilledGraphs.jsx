import React, { useEffect, useState } from "react";
import styles from "./FilledGraphs.module.css";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Empty from "./Empty";

const FilledGraphs = ({ setHasData, onEdit }) => {
  const [dates, setDates] = useState({});

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-costs")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(data => {
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

  if (Object.keys(dates).length === 0) {
    return <Empty />;
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(dates).map(([date, details], index) => (
        <div key={index} className={styles.container}>
          <span className="text-left">{date}</span>
          <div onClick={() => onEdit({date, ...details})} className="flex justify-end items-center">
            <MdEdit  /> Изменить
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilledGraphs;



// import React, { useEffect, useState } from "react";
// import styles from "./FilledGraphs.module.css";
// import { MdEdit } from "react-icons/md";
// import { FaTrashAlt } from "react-icons/fa";
// import Empty from "./Empty";

// const FilledGraphs = ({ setHasData }) => {
//     const [dates, setDates] = useState({});

//     useEffect(() => {
//       const mockData = {
//         '2024-01-01': { summ: 500 },
//         '2024-02-01': { summ: 300 },
//         '2024-03-01': { summ: 450 },
//         '2024-04-01': { summ: 700 },
//         '2024-08-01': { summ: 700 },
//         '2025-01-01': { summ: 150 },
//         '2025-02-01': { summ: 250 },
//         '2025-03-01': { summ: 350 },
//         '2026-01-01': { summ: 120 },
//         '2026-02-01': { summ: 180 },
//         '2026-03-01': { summ: 180 },
//         '2026-04-01': { summ: 180 }
//       };
//         setTimeout(() => {
//             setDates(mockData);
//             setHasData(Object.keys(mockData).length > 0);
//         }, 1000);  
//     }, [setHasData]);

//     if (Object.keys(dates).length === 0) {
//         return <Empty />;
//     }

//     return (
//         <div className={styles.wrapper}>
//             {Object.entries(dates).map(([date, details], index) => (
//                 <div key={index} className={styles.container}>
//                     <span className="text-left">{date}</span>
//                     <div className="flex justify-end items-center">
//                         <MdEdit /> Изменить
//                         <FaTrashAlt />
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default FilledGraphs;

