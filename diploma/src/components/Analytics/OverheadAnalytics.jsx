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
  const [chartData, setChartData] = useState([]);
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  const chartRef = useRef();

  useEffect(() => {
    if (selectedYear) {
      fetch(`https://enterpizemate.dyzoon.dev/api/analytics/get-costs?year=${selectedYear}`)
        .then(response => response.json())
        .then(data => {
          const summ = Object.entries(data).map(([key, value]) => value.summ);
          setChartData(summ);
          setShowChart(true); 
        })
        .catch(error => console.error('Failed to fetch data', error));
    }
  }, [selectedYear]);

  const handleShowGraph = () => {
    setShowYearModal(true);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setShowYearModal(false);
  };

  const data = {
    labels: [
      "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ],
    datasets: [
      {
        label: "Сумма накладных расходов в тыс. руб.",
        data: chartData, 
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
      <FilledGraphs />
      <Button text="Показать график" onClick={handleShowGraph} />
      <SelectYearModal
        isActive={showYearModal}
        onSelectYear={handleSelectYear}
        onClose={() => setShowYearModal(false)}
      />
      {showChart && (
        <div className="chart__container">
          <div ref={chartRef} className="chart">
            <Line data={data} options={options} />
          </div>
          <Button onClick={downloadChartAsPDF} className="pdf">
            Скачать график <FaRegFilePdf />
          </Button>
        </div>
      )}
    </AnalyticsWrapper>
  );
};

export default OverheadAnalytics;
