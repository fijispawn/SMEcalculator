import React, { useState, useRef } from "react";
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
import Fake from "./FilledGraphs/Fake";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BalanceAnalytics = () => {
  const [showChart, setShowChart] = useState(false);
  const chartRef = useRef();

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
        label: "Баланс за все время",
        data: [234,6, 59, 80],
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
    <AnalyticsWrapper activeTab="balance-analytics">
      {!showChart && (
        <>
          <Fake />
          <Button disabled={true} text="Показать график" onClick={() => setShowChart(true)} />
        </>
      )}
      {showChart && (
        <>
          <div className="chart__container">
            <div ref={chartRef} className="chart">
              <Line data={data} options={options} />
            </div>
            <Button onClick={downloadChartAsPDF} className="pdf">
              Скачать график <FaRegFilePdf />
            </Button>
          </div>
        </>
      )}
    </AnalyticsWrapper>
  );
};

export default BalanceAnalytics;
