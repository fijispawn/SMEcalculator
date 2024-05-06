import React, { useState, useEffect, useRef } from "react";
import "../Indicators/Indicators.css";
import { AnalyticsWrapper } from "./AnalyticsWrapper/AnalyticsWrapper";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Button from "../Button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaRegFilePdf } from "react-icons/fa";
import FilledGraphs from "./FilledGraphs/FilledGraphs";
import SelectYearModal from "../Modal/SelectYearModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const OverheadAnalytics = () => {
  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hasData, setHasData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-costs")
      .then(response => response.json())
      .then(data => {
        console.log('All fetched data:', data); // Log all fetched data for verification.
        const initData = Array(12).fill(null);
  
        Object.entries(data).forEach(([key, value]) => {
          const date = new Date(value.date); // Assuming `date` is the key in each data entry
          const year = date.getFullYear();
          const month = date.getMonth(); // getMonth() returns month index (0-11)
  
          if (year === selectedYear) {
            initData[month] = value.summ; // Assuming `summ` holds the data value you need
          }
        });
  
        console.log(`Data for ${selectedYear}:`, initData); // Check the processed data
  
        setFilteredData(initData);
        setHasData(initData.some(value => value !== null));
      })
      .catch(error => console.error('Failed to fetch data', error));
  }, [selectedYear]);
  

  const handleShowChart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectYear = (year) => {
    console.log(`Year selected: ${year}`);
    setSelectedYear(year);
    setShowModal(false);
    setShowChart(true);
  };

  const data = {
    labels: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
    datasets: [
      {
        label: "Сумма накладных расходов в тыс. руб.",
        data: filteredData,
        fill: false,
        backgroundColor: "rgb(253, 119, 112)",
        borderColor: "rgba(253, 119, 112, 0.3)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: true,
    },
    maintainAspectRatio: false,
  };

  const downloadChartAsPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
      pdf.save("chart.pdf");
    });
  };

  return (
    <AnalyticsWrapper activeTab="overhead-analytics">
      {showChart ? (
        <div className="chart__container">
          <div ref={chartRef} className="chart">
            <Line data={data} options={options} />
          </div>
          <Button onClick={downloadChartAsPDF} className="pdf">
            Скачать график <FaRegFilePdf />
          </Button>
        </div>
      ) : (
        <>
          <FilledGraphs setHasData={setHasData} />
          <Button text="Показать график" onClick={handleShowChart} disabled={!hasData} />
          <SelectYearModal isOpen={showModal} onClose={handleCloseModal} onSelectYear={handleSelectYear} />
        </>
      )}
    </AnalyticsWrapper>
  );
};

export default OverheadAnalytics;


// import React, { useState, useEffect, useRef } from "react";
// import "../Indicators/Indicators.css";
// import { AnalyticsWrapper } from "./AnalyticsWrapper/AnalyticsWrapper";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Button from "../Button/Button";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { FaRegFilePdf } from "react-icons/fa";
// import FilledGraphs from "./FilledGraphs/FilledGraphs";
// import SelectYearModal from "../Modal/SelectYearModal";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const OverheadAnalytics = () => {
//   const [showChart, setShowChart] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [hasData, setHasData] = useState(false);
//   const [filteredData, setFilteredData] = useState([]);
//   const chartRef = useRef();

//   useEffect(() => {
//     const mockData = {
//       "2024-01-01": { summ: 500 },
//       "2024-02-01": { summ: 300 },
//       "2024-03-01": { summ: 450 },
//       "2024-04-01": { summ: 700 },
//       "2024-08-01": { summ: 700 },
//       "2025-01-01": { summ: 150 },
//       "2025-02-01": { summ: 250 },
//       "2025-03-01": { summ: 350 },
//       "2026-01-01": { summ: 120 },
//       "2026-02-01": { summ: 180 },
//       "2026-03-01": { summ: 180 },
//       "2026-04-01": { summ: 180 },
//     };
  
//     const yearData = Object.entries(mockData)
//       .filter(([date]) => date.startsWith(selectedYear))
//       .map(([date, { summ }]) => {
//         const month = parseInt(date.substring(5, 7)) - 1; 
//         return { month, summ };
//       });
  
//     const initData = Array(12).fill(null);
//     yearData.forEach(({ month, summ }) => {
//       initData[month] = summ;
//     });
  
//     console.log(`Data for ${selectedYear}:`, initData);
  
//     setFilteredData(initData);
//     setHasData(initData.some((value) => value !== null));
//   }, [selectedYear]);
  
//   const handleShowChart = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleSelectYear = (year) => {
//     console.log(`Year selected: ${year}`);
//     setSelectedYear(year);
//     setShowModal(false);
//     setShowChart(true);
//   };

//   const data = {
//     labels: [
//       "Январь",
//       "Февраль",
//       "Март",
//       "Апрель",
//       "Май",
//       "Июнь",
//       "Июль",
//       "Август",
//       "Сентябрь",
//       "Октябрь",
//       "Ноябрь",
//       "Декабрь",
//     ],
//     datasets: [
//       {
//         label: "Сумма накладных расходов в тыс. руб.",
//         data: filteredData,
//         fill: false,
//         backgroundColor: "rgb(253, 119, 112)",
//         borderColor: "rgba(253, 119, 112, 0.3)",
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//     legend: {
//       display: true,
//     },
//     maintainAspectRatio: false,
//   };

//   const downloadChartAsPDF = () => {
//     html2canvas(chartRef.current).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("landscape");
//       pdf.addImage(imgData, "PNG", 10, 10, 280, 150);
//       pdf.save("chart.pdf");
//     });
//   };

//   return (
//     <AnalyticsWrapper activeTab="overhead-analytics">
//       {showChart ? (
//         <div className="chart__container">
//           <div ref={chartRef} className="chart">
//             <Line data={data} options={options} />
//           </div>
//           <Button onClick={downloadChartAsPDF} className="pdf">
//             Скачать график <FaRegFilePdf />
//           </Button>
//         </div>
//       ) : (
//         <>
//           <FilledGraphs setHasData={setHasData} />
//           <Button
//             text="Показать график"
//             onClick={handleShowChart}
//             disabled={!hasData}
//           />
//           <SelectYearModal
//             isOpen={showModal}
//             onClose={handleCloseModal}
//             onSelectYear={handleSelectYear}
//           />
//         </>
//       )}
//     </AnalyticsWrapper>
//   );
// };

// export default OverheadAnalytics;
