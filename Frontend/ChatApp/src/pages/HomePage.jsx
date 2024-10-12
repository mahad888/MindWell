import { Box, createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Feeds/Navbar";
import MyPostWidget from "../components/Feeds/MyPostWidget";
import PostsWidget from "../components/Feeds/PostsWidget";
import AdvertWidget from "../components/Feeds/AdvertWidget";
import FriendListWidget from "../components/Feeds/FriendListWidget";
import { useMemo } from "react";
import { themeSettings } from "../theme";
import MindWellAppLayout from "../components/Layout/MindWellApplayout";


const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { user } = useSelector((state) => state.auth);
  const {_id, post} = user;

  const { role,mode } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <MindWellAppLayout>
    <ThemeProvider theme={theme}>
    <Box>
      {/* <Navbar/> */}
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
        {/* </Box> */} 
        <Box
          flexBasis={isNonMobileScreens ? "55%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          marginRight={"2rem"}
        >
          <MyPostWidget />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="32%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
    </ThemeProvider>
    </MindWellAppLayout>
  );
};

export default HomePage;