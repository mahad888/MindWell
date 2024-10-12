import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../../../components/shared/ChatItem";
import { transformImage } from "../../../lib/features";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}  sx={{
      height: "100vh",
      overflow: "auto",
  
    }}>
      {chats?.map((data, index) => {
        const { _id, name, avatar, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(
          (item) => item.chatId === _id
        );
        const isOnline = members?.some((member) => onlineUsers.includes(member));
        return (
          <ChatItem
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            index={index}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            key={_id}
            handleDeletChat={handleDeleteChat}
            sameSender={chatId === _id}

          />
        );
      })}
     
    </Stack>
  );
};

export default ChatList;
