import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import ChatList from "../../pages/ChatSystem/Specific/ChatList";
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from "@mui/material";
import { chats } from "../../Constants/sampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../../pages/ChatSystem/Specific/Profile";
import { useMyChatsQuery } from "../../Redux/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../Redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../hooks/hooks";
import { useSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../Constants/events";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../Redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { isMobile } = useSelector((state) => state.misc);

    const { newMessagesAlert } = useSelector((state) => state.chat);
    

    const socket = useSocket();

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("delete chat", _id, groupChat);
    };
    const { isLoading, data, error, refetch, isError } = useMyChatsQuery();

    useErrors([{ isError, error }]);
    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessagesAlert,
      });
    }, [newMessagesAlert]);

    const handleMobileClose = () => {
      dispatch(setIsMobile(false));
    };
    const newMessagesAlertListener = useCallback(
      
      (data) => {
        console.log("new message alert", data.chatId);
        if (data.chatId === chatId) return;
        dispatch(setNewMessagesAlert(data));
      },
      [chatId]
    );

    const newRequestListener = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(() => {
      refetch();
    }, [refetch, navigate]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);



    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertListener,
      [NEW_REQUEST]: newRequestListener,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <div style={{ height: "100vh", overflow: "hidden" }}>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              borderRight: "1px solid #ccc",
              overflowY: "auto", // allow scrolling inside
            }}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessagesAlert={newMessagesAlert}
                
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            lg={6}
            sx={{ overflowY: "auto" }} // allow scrolling inside
            height={"100%"}
          >
            <WrappedComponent {...props} chatId={chatId} />
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            sx={{
              display: { xs: "none", md: "block" },
              bgcolor: "#f1f1f1",
              borderLeft: "1px solid #ccc",
              overflowY: "auto", // allow scrolling inside
            }}
            height={"100%"}
          >
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default AppLayout;
