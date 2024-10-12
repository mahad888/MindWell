import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  IconButton,
  Drawer,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  AppBar,
  List,
  Toolbar,
} from "@mui/material";
import {
  Close,
  Dashboard,
  Person,
  AccountCircle,
  Edit,
  Menu as MenuIcon,
  LogoutRounded,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../../Redux/reducers/auth";
import NotificationsIcon from "@mui/icons-material/Notifications";


const adminTabs = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/doctor/dashboard",
  },
  {
    label: "Patients",
    icon: <Person />,
    path: "/doctor/registered-patients",
  },
  {
    label: "My Profile",
    icon: <AccountCircle />,
    path: "/doctor/",
  },
  {
    label: "Edit Profile",
    icon: <Edit />,
    path: "/doctor/update-profile",
  },
];

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user")
    dispatch(userNotExist());
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          top: "64px",
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {adminTabs.map((tab) => (
          <ListItem
            key={tab.path}
            button
            onClick={() => navigate(tab.path)} // Corrected onClick
            sx={{
              backgroundColor: location.pathname === tab.path ? "#e0f2f1" : "white",
              borderRadius: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <ListItemIcon>{tab.icon}</ListItemIcon>
            <ListItemText primary={tab.label} />
          </ListItem>
        ))}
        <ListItem
          button
          onClick={logoutHandler} // Added logout functionality
          sx={{
            backgroundColor: "white",
            borderRadius: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <ListItemIcon>
            <LogoutRounded />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};


const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const { user } = useSelector((state) => state.auth);
  
    const handleMobileToggle = () => {
      setIsMobile((prevIsMobile) => !prevIsMobile);
    };
  
    const closeMobile = () => {
      setIsMobile(false);
    };
  
    return (
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar>
          {/* Menu Icon before the title */}
          <Box
            paddingRight={2}
            sx={{
              display: { xs: "block", sm: "none" }, // Visible on mobile devices only
              position: "fixed",
              left: `1rem`,
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
  
          {/* Title after the Menu Icon */}
          <Typography variant="h6" style={{ flexGrow: 1, paddingLeft: "4rem" }}>
            Doctor's Dashboard
          </Typography>
  
          {/* Notification and Avatar icons */}
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Avatar alt="Doctor Profile" src={user?.avatar?.url} />
        </Toolbar>
      </AppBar>
    );
  };
  
const DoctorLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Grid
        container
        minHeight={"100vh"}
        sx={{
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          md={4}
          lg={2}
          sx={{
            display: { xs: "none", md: "block" },
            height: "100vh",
            overflow: "auto",
            
          }}
        >
          <Sidebar />
        </Grid>

        <Grid item xs={12} md={8} lg={9}  minHeight={"100vh"}
        marginTop={5}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default DoctorLayout;
