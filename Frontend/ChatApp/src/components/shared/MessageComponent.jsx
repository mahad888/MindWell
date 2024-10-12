import React, { memo } from "react";
import { Typography, Box } from "@mui/material";
import moment from "moment";
import { fileformat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments , createdAt } = message;
  const sameSender = sender._id === user._id;
  const time = moment(createdAt).format("hh:mm A");
 

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#72A0C1" : "#E5E5EA",
        color: sameSender ? "#fff" : "#000",
        borderRadius: "1rem",
        padding: "0.5rem",
        width: "fit-content",
        maxWidth: "70%",
        wordBreak: "break-word",
      }}
    >
      {!sameSender && (
        <Typography color={"#2694ab"} fontWeight={"600"} variant="caption">
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachments?.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileformat(url);
          console.log(file)
          console.log(url)

          return (
            <Box key={index} mt={0.5}>
              <a
                href={url}
                target="_blank"
                download={url.split('/').pop()}
                rel="noopener noreferrer"
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <RenderAttachment file={file} url={url} />
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" align={sameSender ? "left" : "right"} display="block" mt={0.5}>
        {time}
      </Typography>
    </div>
  );
};

export default MessageComponent;
