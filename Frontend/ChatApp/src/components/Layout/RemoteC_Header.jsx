import {
  BookOnline,
  Close,
  Home,
  LocalHospital,
  Menu as MenuIcon,
  Person2Outlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useSelector } from "react-redux";

const tab = [
  {
    label: "Home",
    link: "/remote-counselling",
    icon: <Home />,
  },
  {
    label: "Doctors",
    link: "/doctors",
    icon: <Person2Outlined />,
  },
  {
    label: "Appointments",
    link: "/remote-counselling/appointments",
    icon: <BookOnline />,
  },
  {
    label: "Services",
    link: "/services",
    icon: <LocalHospital />,
  },
];


const Sidebar = ({ width = "100%" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack width={width} direction={"column"} p={"3rem"}>
      <Typography variant={"h5"}>Remote Counselling</Typography>
      <Stack mt={"2rem"} spacing={2}>
        {tab.map((item, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            borderRadius={"20px"}
            p={"0.5rem"}
            onClick={() => navigate(item.link)}
            sx={{
              ...(location.pathname === item.link
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
            {item.icon}
            <Typography>{item.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const RemoteC_Header = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  const handleMobileToggle = () => {
    setIsMobile(!isMobile);
  };

  const closeMobile = () => {
    setIsMobile(false);
  };
const {user} = useSelector((state) => state.auth);


  return (
    <Stack
      direction="row"
      padding={1}
      alignItems="center"
      height={"5em"}
      bgcolor={"00000"}
    >
      <Link to='/mind-well'>
      <Box
              component="img"
              src= {logo} // Replace with the actual logo path
              alt="MindWell Logo"
              sx={{ height: "4rem", marginLeft: "1rem" }} // Adjusts the logo size
            />
      </Link>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {tab.map((item, index) => (
            <Link to={item.link} key={index}>
              <Button
                startIcon={item.icon}
                variant="text"
                sx={{
                  color: location.pathname === item.link ? "#317873" : "black",
                  fontWeight: 500,
                  "&:hover": {
                    color: "#5072A7",
                  },
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Stack>
      </Box>

      <Avatar
        alt="User"
        src={user?.avatar.url}
        sx={{
          width: 50,
          height: 50,
          marginRight: 2,
        }}
      />

      <Box
        sx={{
          display: { xs: "block", md: "none" }, // MenuIcon visible on small screens
          top: `1rem`,
          color: "white",
        }}
      >
        <IconButton sx={{ color: "" }} onClick={handleMobileToggle}>
          {isMobile ? <Close /> : <MenuIcon />} {/* Correctly toggling between Close and MenuIcon */}
        </IconButton>
        <Drawer open={isMobile} onClose={closeMobile}>
          <Sidebar width={"50vw"} />
        </Drawer>
      </Box>
    </Stack>
  );
};

export default RemoteC_Header;
