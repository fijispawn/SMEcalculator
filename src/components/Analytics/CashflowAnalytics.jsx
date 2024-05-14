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
import SelectYearModal from "../Modal/SelectYearModal";
import { useNavigate } from "react-router-dom"; 
import FilledCashflow from "./FilledGraphs/FilledCashflow";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CashflowAnalytics = () => {
  const [showChart, setShowChart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hasData, setHasData] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef();
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-balance")
      .then(response => response.json())
      .then(data => {
        let dataAvailable = false;
        const currentYear = new Date().getFullYear();
        const yearsToCheck = Array.from({ length: 11 }, (_, i) => currentYear + i);

        Object.entries(data).forEach(([key, value]) => {
          const year = new Date(key).getFullYear();
          if (yearsToCheck.includes(year)) {
            dataAvailable = true;
          }
        });

        setHasData(dataAvailable);
      })
      .catch(error => {
        console.error("Failed to fetch data", error);
        setHasData(false);
      });
  }, []);

  
  

  // useEffect(() => {
  //   // Mock data as previously defined in FilledGraphs
  //   const mockData = {
  //     "2024-03-01": { summ: 210 },
  //     "2024-04-01": { summ: 310 },
  //     "2025-01-01": { summ: 410 },
  //     "2025-02-01": { summ: 510 },
  //     "2026-03-01": { summ: 610 },
  //     "2026-04-01": { summ: 710 }
  //   };

  //   const initData = Array(12).fill(null);
  //   Object.entries(mockData).forEach(([key, value]) => {
  //     const parsedDate = new Date(key);
  //     const year = parsedDate.getFullYear();
  //     const month = parsedDate.getMonth();

  //     if (year === selectedYear) {
  //       initData[month] = value.summ;
  //     }
  //   });

  //   setFilteredData(initData);
  // }, [selectedYear]);

  const handleShowChart = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setShowModal(false);
    setShowChart(true);
  };

  const data = {
    labels: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    datasets: [
      {
        label: "Движение средств в тыс. руб.",
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

  const handleEditData = (data) => {
    navigate("/cashflow", { state: data }); 
  };

  return (
    <AnalyticsWrapper activeTab="cashflow-analytics">
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
          <FilledCashflow setHasData={setHasData} onEdit={handleEditData} />
          <Button
            text="Показать график"
            onClick={handleShowChart}
            disabled={!hasData}
          />
          <SelectYearModal
            isOpen={showModal}
            onClose={handleCloseModal}
            onSelectYear={handleSelectYear}
          />
        </>
      )}
    </AnalyticsWrapper>
  );
};

export default CashflowAnalytics;
