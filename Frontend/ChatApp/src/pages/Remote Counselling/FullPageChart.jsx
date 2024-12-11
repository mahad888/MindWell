import React from "react";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FullPageBarGraph = ({neutralPostsAfterAppointment,negativePostsAfterAppointment,neutralMessagesAfterAppointment,negativeMessagesAfterAppointment}) => {
  const data = {
    labels: ["Neutral Posts", "Negative Posts", "Neutral Messages", "Negative Messages"],
    datasets: [
      {
        label: "Counts",
        data: [
          neutralPostsAfterAppointment,
          negativePostsAfterAppointment,
          neutralMessagesAfterAppointment,
          negativeMessagesAfterAppointment,
        ],
        backgroundColor: ["#42a5f5", "#ef5350", "#66bb6a", "#ffa726"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Appointment-Related Statistics",
      },
    },
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
      Counseling Outcome Insights
      </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
            This graph shows the number of neutral and negative posts and messages after the last appointment.
        </Typography>

      <Box
        sx={{
          height: "80%",
          width: "90%",
          backgroundColor: "#ffffff",
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default FullPageBarGraph;
