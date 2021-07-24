import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyDate, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, [setDailyData]);

  const lineChart = dailyDate.length ? (
    <Line
      data={{
        labels: dailyDate.map(({ date }) => date),
        datasets: [
          {
            data: dailyDate.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "red",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fill: true,
          },
          {
            data: dailyDate.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "black",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChar = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovred", "Deaths"],
        datasets: [
          {
            label: "Peaple",
            backgroundColor: [
              "rgba(255, 0, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(0, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChar : lineChart}</div>
  );
};

export default Chart;
