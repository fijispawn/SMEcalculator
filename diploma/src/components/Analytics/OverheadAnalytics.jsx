import React, { useState, useEffect, useRef } from "react";
import "../Indicators/Indicators.css";
import { AnalyticsWrapper } from "./AnalyticsWrapper/AnalyticsWrapper";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Button from "../Button/Button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaRegFilePdf } from "react-icons/fa";
import FilledGraphs from './FilledGraphs/FilledGraphs'; 
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
  const [allData, setAllData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-costs")
      .then(response => response.json())
      .then(data => {
        setAllData(data); // Store all data
      })
      .catch(error => console.error('Failed to fetch data', error));
  }, []);

  useEffect(() => {
    // Update filtered data based on the selected year
    const initData = Array(12).fill(null);
    Object.entries(allData).forEach(([date, { summ }]) => {
      const year = new Date(date).getFullYear();
      const month = new Date(date).getMonth();
      if (year === selectedYear) {
        initData[month] = summ;
      }
    });
    setFilteredData(initData);
  }, [selectedYear, allData]); // Depend on selectedYear and allData

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
          <FilledGraphs />
          <Button text="Показать график" onClick={handleShowChart} />
          <SelectYearModal isOpen={showModal} onClose={handleCloseModal} onSelectYear={handleSelectYear} />
        </>
      )}
    </AnalyticsWrapper>
  );
};

export default OverheadAnalytics;
