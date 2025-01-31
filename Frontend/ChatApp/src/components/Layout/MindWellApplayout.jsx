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
import { setMode, userNotExist } from "../../Redux/reducers/auth";
import FeedbackRounded from "@mui/icons-material/FeedbackRounded";
import { setIsEditProfile, setIsFeedback } from "../../Redux/reducers/misc";
import EditProfile from "../../pages/ChatSystem/Specific/EditProfile";
import MindWellAppbar from "./MindWellAppbar";
import logo from "../../assets/images/logo.png";

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
    localStorage.removeItem("dontShowAgain");
    
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
                  { text: "Home", icon: <HomeIcon sx={{ color: "#3E8EDE" }} />, path: "/mind-well" },
                  { text: "AI-Powered Assessment", icon: <AssessmentIcon sx={{ color: "#034694" }} />, path: "/survey" },
                  { text: "Smart Chatbot", icon: <ChatBubbleOutlineIcon sx={{ color: "#7CB9E8" }} />, path: "/chatbot" },
                  { text: "Interactive Exercises", icon: <FitnessCenterIcon sx={{ color: "#7CB9E8" }} />, path: "/interactive-exercises" },
                  { text: "Peer Support", icon: <PeopleIcon sx={{ color: "#034694" }} />, path: "/chatinbox" },
                  { text: "Remote Counselling", icon: <ChatIcon sx={{ color: "#3E8EDE" }} />, path: "/remote-counselling" },
                  { text: "Progress Tracking", icon: <TimelineIcon sx={{ color: "#034694" }} />, path: "/progress_tracking" },
                  { text: "Mindful Games", icon: <GamesIcon sx={{ color: "#CCCCFF" }} />, path: "/mindful-games" }
                
          
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
            <FeedbackRounded sx={{color:"#1ca9c9"}} />
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
      <Box sx={{ display: 'flex', width: '100%' }}>
        
        {/* Drawer Section */}
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2.5}
          sx={{
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Grid>
        
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />

        {/* Main Content Section */}
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          lg={10}
          sx={{
            marginTop: { lg: 7, xs: 0 },
            minHeight: "100vh",
            bgcolor: "#f7f7f7",
            width: '100%',
            color:"primary"
          }}
        >
          {children}
        </Grid>
      </Box>
    </Grid>
    </ThemeProvider>
  );
};

export default MindWellAppLayout;
