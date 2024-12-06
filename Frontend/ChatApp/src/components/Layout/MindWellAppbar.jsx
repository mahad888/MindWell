import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import React, { Suspense } from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import { Help, MessageRounded, Notifications } from '@mui/icons-material';
import logo from "../../assets/images/logo.png";
import EditProfile from '../../pages/ChatSystem/Specific/EditProfile';
import { useSelector } from 'react-redux';


const MindWellAppbar = (handleClick,handleDrawerToggle,isEditProfile,handleEditProfile) => {
    const user = useSelector((state) => state.auth.user);

  return (
    <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, 
            backgroundColor: "white",
        }}
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



          <Notifications sx={{ fontSize: "25px", mr: 2 ,color:"black"}} />
          <Help sx={{ fontSize: "25px", mr: 2, color:"black"}} />
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
  )
}


export default MindWellAppbar