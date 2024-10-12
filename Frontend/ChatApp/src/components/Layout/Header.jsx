import React, { useState, Suspense, lazy } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Backdrop,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../Redux/reducers/misc";
import { resetNotificationCount } from "../../Redux/reducers/chat";
import logo from "../../assets/images/logo.png";

const SearchBox = lazy(() => import("../../pages/ChatSystem/Specific/Search"));
const Newgroup = lazy(() => import("../../pages/ChatSystem/Specific/Newgroup"));
const NotificationBox = lazy(() => import("../../pages/ChatSystem/Specific/Notification"));

const Header = () => {
  const [logout, setLogout] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isSearch,isNewGroup, isNotification} = useSelector((state) => state.misc);
  const {notificationCount} = useSelector((state) => state.chat);
  
  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const handleSearch = () => {
    dispatch(setIsSearch(true));
  };

  

  const navigateToGroup = () => {
    navigate("/groups");
  };
  const handleNewGroup = () => {
   dispatch (setIsNewGroup(true));
  };

  const handleNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const handleLogout = () => {
    setLogout(true);
  };

  return (
    <>
      <Box sx={{ height: "4rem", flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#ffffff",
            color: "black",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
           
            borderRadius: "5px 5px 10px 10px",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiIconButton-root": {
              backgroundColor: "#f1f1f1",
              color: "#333", // Darker black for icons
              marginLeft: "1rem", // Adds space between icons
              "&:hover": {
                backgroundColor: "#e0e0e0",
                color: "#002D62",
              },
            },
            "& .MuiSvgIcon-root": {
              fontSize: "1.75rem",
            },
          }}
        >
          <Toolbar>
            {/* Logo Section */}
            <Box sx={{ display: { xs: "block", sm: "none" ,marginRight:"0.5rem"} }}>
              <IconButton onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Link to="/mind-well" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src= {logo} // Replace with the actual logo path
              alt="MindWell Logo"
              sx={{ height: "4rem", marginRight: "1rem" }} // Adjusts the logo size
            />
            </Link>

            {/* Mobile Menu Icon */}
            

            <Box sx={{ flexGrow: 1 }} />

            {/* Icons Section */}
            <Tooltip title="Search">
              <Box>
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Box>
            </Tooltip>

            <Tooltip title="New Group">
              <Box>
                <IconButton onClick={handleNewGroup}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Tooltip>

            <Tooltip title="Manage Group">
              <Box>
                <IconButton onClick={navigateToGroup}>
                  <GroupIcon />
                </IconButton>
              </Box>
            </Tooltip>

            <Tooltip title="Notifications">
              <Box>
                <IconButton onClick={handleNotification}>
                  {notificationCount ? (
                    <Badge color="error" badgeContent={notificationCount}>
                      <NotificationsIcon />
                    </Badge>
                  ) : (
                    <NotificationsIcon />
                  )}
                </IconButton>
              </Box>
            </Tooltip>

            <Tooltip title="Logout">
              <Box>
                <IconButton onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Box>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchBox />
        </Suspense>
      )}
      { isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <Newgroup />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationBox />
        </Suspense>
      )}
    </>
  );
};

export default Header;
