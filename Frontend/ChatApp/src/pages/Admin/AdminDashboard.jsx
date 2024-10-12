import React from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettingsRounded,
  Group,
  Message,
  Notifications,
  Person,
} from "@mui/icons-material";
import {
  Searchfield,
  CurveButton,
} from "../../components/styles/StyledComponent";
import moment from "moment";
import { DoughnutChart, LineChart } from "../ChatSystem/Specific/Chart";

// Capitalize Widget component
const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "1rem",
        margin: "1rem 0",
        borderRadius: "4rem",
        textAlign: "center",
        width:'20rem', // Ensure widgets have equal size
        
      }}
    >
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "center",
          margin: "1rem 0",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "5px solid rgba(0,0,0,0.9)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value}
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        spacing={"1rem"}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Icon}
        <Typography variant="h6">{title}

        </Typography>
      </Stack>
    </Paper>
  );
};

const AdminDashboard = () => {
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
        <Searchfield placeholder={"Search"} />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1}></Box>
        <Typography
          variant={"body1"}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
          display={{
            xs: "none",
            lg: "block",
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
      <Stack display={{
        xs: "none",
        lg:'block'
      }}>
      <Notifications  />

      </Stack>
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"1rem 0"}
    >
      <Widget title={"Users"} value={34} Icon={<Person />} />
      <Widget title={"Chats"} value={3} Icon={<Group />} />
      <Widget title={"Messages"} value={453} Icon={<Message />} />
    </Stack>
  );

  return (
    <AdminLayout>
      <Container
        component={"main"}
        sx={{
          overflow: "hidden",
        }}
      >
        {Appbar}

        <Stack
          direction={
            {
              xs: "column",
              lg: "row",
            }

          }
          alignItems={{
            xs: "center",
            lg: "flex-start",
          }}
          spacing={"2rem"}
          flexWrap="wrap"
          justifyContent={"center"}

        >
          <Paper
            elevation={3}
            sx={{
              padding: "1rem 2rem",
              borderRadius: "2rem",
              width: "100%",
              maxWidth: "38rem",
            }}
          >
            <Stack>
              <Typography variant="h4" margin={"1rem 0"}>
                Last Messages
              </Typography>
              <LineChart value={[3, 2, 2, 1, 5, 6, 7]} />
            </Stack>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: {
                xs: "100%",
                sm: "50%",
              },
              width: "100%",
              maxWidth: "23rem",
            }}
          >
            <DoughnutChart
              labels={["Individual Chats", "Group Chats"]}
              value={[23, 66]}
            />

            <Stack
              position="absolute"
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing="0.5rem"
              width="100%"
              height="100%"
            >
              <Person fontSize={"large"} />
              <Typography variant={"h5"}>vs</Typography>
              <Group fontSize={"large"} />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

export default AdminDashboard;
