import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement
} from "chart.js";
import { getlast7days } from "../../../lib/features";
import zIndex from "@mui/material/styles/zIndex";

Chart.register(
  Filler,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  ArcElement
);

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

export const LineChart = ({ value }) => {
  return (
    <Line
      data={{
        labels: getlast7days(),
        datasets: [
          {
            label: "Appointments ",
            data: value,
            fill: true,
            borderColor: ["rgba(255,206,86,0.7)"],
            backgroundColor: ["rgba(255,206,86,0.2)"],
            pointBackgroundColor: "rgba(255,206,86,0.6)",
            pointBorderColor: "rgba(255,206,86,0.2)",
          },
         
        ],
      }}
      options={lineChartOptions}
    />
  );
};
const DoughnutChartOptions = {
    responsive: true,
   
    cutout:100
    };

export const DoughnutChart = ({ value = [], labels = []}) => {
  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            
            data: value,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            hoverBackgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            offset:20

            
          },
        ],

      }}
      options={DoughnutChartOptions}
      style={{zIndex:10}}

    />
  );
};
