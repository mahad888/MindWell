import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/Layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography, CircularProgress } from "@mui/material";
import {
  AdminPanelSettingsRounded,
  Group,
  Message,
  Notifications,
  Person,
  EventAvailable,
} from "@mui/icons-material";
import { Searchfield, CurveButton } from "../../components/styles/StyledComponent";
import moment from "moment";
import { DoughnutChart, LineChart } from "../ChatSystem/Specific/Chart";

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={5}
    sx={{
      padding: "2rem",
      borderRadius: "2rem",
      textAlign: "center",
      width: "20rem",
      background: "linear-gradient(145deg, #f3f4f6, #e3e4e6)",
      boxShadow: "10px 10px 20px #b5b5b5, -10px -10px 20px #ffffff",
      transition: "all 0.3s",
      "&:hover": {
        transform: "translateY(-10px)",
        boxShadow: "10px 20px 25px rgba(0,0,0,0.2)",
      },
    }}
  >
    <Stack alignItems="center" justifyContent="center" spacing={2}>
      <Typography
        variant="h3"
        sx={{
          color: "rgba(0,0,0,0.85)",
          borderRadius: "50%",
          width: "6rem",
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle, #007aff, #005bb5)",
          color: "#fff",
        }}
      >
        {value}
      </Typography>
      {Icon}
      <Typography variant="h6" color="textSecondary" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
    </Stack>
  </Paper>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { "Content-Type": "application/json" },
        });
        setStats(response.data.stats);
        console.log(response.data.stats);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <Container sx={{ textAlign: "center", padding: "5rem" }}>
          <CircularProgress size={80} />
        </Container>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Container>
          <Typography color="error" variant="h6">
            {error}
          </Typography>
        </Container>
      </AdminLayout>
    );
  }

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "1rem 0",
        borderRadius: "1rem",
      
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsRounded fontSize="large" />
        <Searchfield
          placeholder={"Search"}
          sx={{
            flexGrow: 1,
            maxWidth: "300px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "1rem",
          }}
        />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1}></Box>
        <Typography variant={"body1"} sx={{ fontWeight: "500" }}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <Stack>
          <Notifications />
        </Stack>
      </Stack>
    </Paper>
  );

  return (
    <AdminLayout>
      <Container component={"main"} sx={{ overflow: "hidden" }}>
        {Appbar}

        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          spacing={"2rem"}
          flexWrap="wrap"
          justifyContent={"center"}
        >
          <Paper
            elevation={5}
            sx={{
              padding: "1rem",
              borderRadius: "2rem",
              background: "linear-gradient(145deg, #f7f7f7, #d9d9d9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "23rem",
            }}
          >
            <DoughnutChart
              labels={["Individual Chats", "Group Chats"]}
              value={[stats?.individualChatsCount || 0, stats?.groupsCount || 0]}
            />
          </Paper>

          <Paper
            elevation={5}
            sx={{
              padding: "1rem",
              borderRadius: "2rem",
              background: "linear-gradient(145deg, #f7f7f7, #d9d9d9)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "23rem",
            }}
          >
            <DoughnutChart
              labels={["Doctors", "Patients"]}
              value={[stats?.doctorCount || 0, stats?.patientCount || 0]}
              colors={["#3f51b5", "#ff5722"]}
            />
          </Paper>
        </Stack>

        <Stack direction="row" spacing={3} justifyContent="space-around" margin="2rem 0">
          <Widget title="Users" value={stats?.totalUsers || 0} Icon={<Person />} />
          <Widget title="Chats" value={stats?.totalChatsCount || 0} Icon={<Group />} />
          <Widget title="Messages" value={stats?.messagesCount || 0} Icon={<Message />} />
          <Widget title = 'Appointments' value = {stats?.totalAppointments || 0} Icon = {<EventAvailable/>} />
        </Stack>

        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
            borderRadius: "2rem",
            background: "linear-gradient(145deg, #f3f3f3, #d3d3d3)",
          }}
        >
          <Typography variant="h4" textAlign="center" marginBottom="1rem">
            Appointments booked in the last 7 days
          </Typography>
          <LineChart value={stats?.appointmentsLast7Days || []} />
        </Paper>
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
