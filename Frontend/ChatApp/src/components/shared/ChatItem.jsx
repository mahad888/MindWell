import React, { memo } from "react";
import { Link } from "../styles/StyledComponent";
import { Avatar, AvatarGroup, Stack, Typography } from "@mui/material";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeletChat,
}) => {
  return (
    <Link
      to={`/chat/${_id}`}
      key={_id}
      className="chat-item"
      onContextMenu={(e) => handleDeletChat(e, _id, groupChat)}
      sx={{
        padding: "0",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "1px solid #f1f1f1",
          backgroundColor: sameSender ? "black" : "unset",
          color: sameSender ? "white" : "unset",
          position: "relative",
        }}
      >
        <AvatarGroup max={4} 
        sx={{
          position: "relative",
        }}
        > 
          {avatar &&
            avatar.map((item, index) => (
              <Avatar
                src={item}
                key={index}
                alt={`Avatar ${index}`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginLeft: index !== 0 ? "-35px" : "0",
                }}
              />
            ))}
        </AvatarGroup> 

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert?.count > 0 && (
  <Typography sx={{
    color:'green'

  }}>{newMessageAlert.count} New Message</Typography>
)}

        </Stack>
        {isOnline && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "green",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default memo(ChatItem);
