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
    const loadDataForYear = (year) => {
      fetch("https://enterpizemate.dyzoon.dev/api/analytics/get-cashflow")
        .then((response) => response.json())
        .then((data) => {
          const initData = Array(12).fill(0);

          Object.entries(data).forEach(([key, value]) => {
            const date = new Date(key);
            const month = date.getMonth();
            const dataYear = date.getFullYear();

            if (dataYear === year) {
              initData[month] = value.calculate;
            }
          });

          setFilteredData(initData);
          setHasData(initData.some((month) => month !== 0));
        })
        .catch((error) => {
          console.error("Failed to fetch data", error);
          setFilteredData([]);
          setHasData(false);
        });
    };

    if (showChart) {
      loadDataForYear(selectedYear);
    }
  }, [showChart, selectedYear]);

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
