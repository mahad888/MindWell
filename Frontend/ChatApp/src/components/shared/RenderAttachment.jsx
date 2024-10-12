import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return (
        <video src={url} preload="none" controls style={{ maxWidth: "100%" }} />
      );

    case "audio":
      return <audio src={url} preload="none" controls />;
    
    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="attachment"
          width={'200px'}
          height={'150px'}
          style={{ width: "200px", height: "150px", objectFit: "contain" }}
        />
      );
    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;
