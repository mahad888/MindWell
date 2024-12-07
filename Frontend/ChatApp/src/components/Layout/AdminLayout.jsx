import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import {
  Close,
  Dashboard,
  Feedback,
  Group,
  Menu as MenuIcon,
  Message,
  ManageAccounts,
  Logout,
  HowToRegRounded,
  Upload,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const adminTabs = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/admin/dashboard",
  },
  {
    label: "Users",
    icon: <ManageAccounts />,
    path: "/admin/users-management",
  },
  {
    label: "Chats",
    icon: <Group />,
    path: "/admin/chats",
  },
  {
    label: "Messages",
    icon: <Message />,
    path: "/admin/messages",
  },
  {
    label: "Feedbacks",
    icon: <Feedback />,
    path: "/admin/feedback",
  },
  {
    label: "Approval Requests",
    icon: <HowToRegRounded />,
    path: "/admin/approval-requests",
  },
  {
    label: "Uploading",
    icon: <Upload />,
    path: "/admin/upload",
  },
];

const Sidebar = ({ width = "100%" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  return (
    <Stack width={width} direction={"column"} p={"3rem"}>
      <Typography variant={"h5"}>MindWell Admin Panel</Typography>
      <Stack mt={"2rem"} spacing={2}>
        {adminTabs.map((tab, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            borderRadius={"20px"}
            p={"0.5rem"}
            onClick={() => navigate(tab.path)}
            sx={{
              ...(location.pathname === tab.path
                ? {
                    bgcolor: "#000000",
                    color: "#FFFFFF",
                  }
                : {}),
              cursor: "pointer",
              ":hover": {
                bgcolor: "#f5f5f5",
                color: "grey",
              },
            }}
          >
            {tab.icon}
            <Typography>{tab.label}</Typography>
          </Stack>
        ))}
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={2}
          borderRadius={"20px"}
          p={"0.5rem"}
          onClick={logoutHandler}
          sx={{
            cursor: "pointer",
            ":hover": {
              bgcolor: "#f5f5f5",
              color: "grey",
            },
          }}
        >
          <Logout />
          <Typography>Logout</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const isAdmin = true 

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]); // Add dependencies to useEffect

  const handleMobileToggle = () => {
    setIsMobile((prevIsMobile) => !prevIsMobile);
  };

  const closeMobile = () => {
    setIsMobile(false);
  };

  return (
  <Grid container minHeight={"100vh"} sx={{overflowY:'hidden',
    overflowX:'hidden'
  }}>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: `1rem`,
          top: `1rem`,
          zIndex: 1300,
        }}
      >
        <IconButton color="inherit" onClick={handleMobileToggle}>
          {isMobile ? <Close /> : <MenuIcon />}
        </IconButton>
        <Drawer open={isMobile} onClose={closeMobile}>
          <Sidebar width={"50vw"} />
        </Drawer>
      </Box>
      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100vh",
          overflow: "auto",
          borderRight: "1px solid #ccc",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} bgcolor={"#f5f5f5"} minHeight={"100vh"}>
        {children}
      </Grid>
    </Grid>
  );
};

export default AdminLayout;
