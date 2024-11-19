import React, { lazy, Suspense, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  ThemeProvider,
  createTheme,
  Avatar,
  Grid,
  Divider,
  Popover,
  Paper,
  useTheme,
  Backdrop,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MoodIcon from "@mui/icons-material/Mood";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import TimelineIcon from "@mui/icons-material/Timeline";
import GamesIcon from "@mui/icons-material/Games";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import {
  DarkMode,
  FeedbackOutlined,
  FeedOutlined,
  Help,
  LightMode,
  Logout,
  Message,
  MessageRounded,
  MessageTwoTone,
  Notifications,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/logo.png";
import { setMode, userNotExist } from "../../Redux/reducers/auth";
import FeedbackRounded from "@mui/icons-material/FeedbackRounded";
import { setIsEditProfile, setIsFeedback } from "../../Redux/reducers/misc";
import EditProfile from "../../pages/ChatSystem/Specific/EditProfile";
  const Feedback = lazy(() => import( "../../pages/Feedback"))
  // import Feedback from "../../pages/Feedback";


const drawerWidth = 310;

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "##ECE8ED",
    },
    secondary: {
      main: "#00796b",
    },
  },
});

const MindWellAppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null); // State to handle dropdown
  const {isFeedback,isEditProfile} = useSelector((state) => state.misc);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFeedback = () => {
    dispatch(setIsFeedback(true))
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    dispatch(userNotExist());
    toast.success("Logged out successfully");

  };

  const handleEditProfile = () => {
    dispatch(setIsEditProfile(true))
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {[
          { text: "Home", icon: <HomeIcon />, path: "/mind-well" },
          {
            text: "AI-Powered Assessment",
            icon: <AssessmentIcon />,
            path: "/survey",
          },
          {
            text: "Smart Chatbot",
            icon: <ChatBubbleOutlineIcon />,
            path: "/chatbot",
          },
          {
            text: "Emotion Recognition",
            icon: <MoodIcon />,
            path: "/emotion-recognition",
          },
          {
            text: "Interactive Exercises",
            icon: <FitnessCenterIcon />,
            path: "/interactive-exercises",
          },
          { text: "Peer Support", icon: <PeopleIcon />, path: "/chatinbox" },
          {
            text: "Remote Counselling",
            icon: <ChatIcon />,
            path: "/remote-counselling",
          },
          {
            text: "Progress Tracking",
            icon: <TimelineIcon />,
            path: "/progress-tracking",
          },
          {
            text: "Mindful Games",
            icon: <GamesIcon />,
            path: "/mindful-games",
          },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.path}
            sx={{
              backgroundColor:
                location.pathname === item.path ? "#e0f2f1" : "white",
              borderRadius: "1rem",
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}

        <ListItem
          button
          onClick={handleFeedback}
          sx={{
            width: "100%",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <ListItemIcon>
            <FeedbackRounded />
          </ListItemIcon>
          <ListItemText primary="Feedback and Ratings" />
          
        </ListItem>
        

        {/* Logout Section */}
        <ListItem
          button
          onClick={handleLogout}
          sx={{
            width: "100%",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
       {isFeedback && (
      <Suspense fallback={<Backdrop open />}>
        <Feedback/>
      </Suspense>
    )} 
    </div>
    
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="MindWell Logo"
            style={{ height: "60px", marginRight: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <IconButton onClick={handleClick}>
            <MessageRounded sx={{ fontSize: "25px", color: "black", mr: 2 }} />
          </IconButton>

          {/* Popover for Message List */}
          {/* <Popover
            
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Paper sx={{ width: "300px", maxHeight: "400px" }}>
              <Typography variant="h6" sx={{ padding: "0.5rem" }}>
                Messages
              </Typography>
              <List>
                {/* Example message items */}
          {/* <ListItem button>
                  <ListItemText primary="Message from John" secondary="Hey, how are you?" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Meeting Reminder" secondary="Don't forget our meeting at 5pm." />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="New Task Assigned" secondary="You have a new task: Design UI" />
                </ListItem>
              </List>
            </Paper>
          </Popover> */}

          <Notifications sx={{ fontSize: "25px", mr: 2 }} />
          <Help sx={{ fontSize: "25px", mr: 2 }} />
          <Avatar
            alt="Profile"
            src={user?.avatar?.url || "/default-avatar.png"}
            onClick={handleEditProfile}

          />
          {isEditProfile && (
            <Suspense fallback={<Backdrop open />}>
              <EditProfile />
            </Suspense>
)}
        </Toolbar>
      </AppBar>

      <Grid container>
        <Box sx={{ display: "flex" }}>
          <Grid item md={3} lg={2.5}>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Grid>
          <Divider />
          <Grid
            item
            md={9}
            lg={10}
            marginTop={7}
            minHeight={"100vh"}
            bgcolor={"#f7f7f7"}
          >
            {children}
          </Grid>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default MindWellAppLayout;
