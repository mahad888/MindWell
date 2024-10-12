import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import { UsersDataForAdmin } from "../../Constants/sampleData";
import { Avatar, Box, Stack } from "@mui/material";
import { fileformat, transformImage } from "../../lib/features";
import moment from "moment";
import RenderAttachment from "../../components/shared/RenderAttachment";
import { FileOpen } from "@mui/icons-material";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "attachments",
    headerClassName: "table-header",
    headerName: "Attachments",
    width: 140,
    renderCell: (params) => {
      const {attachments} = params.row;
      return attachments?.length > 0 ?
      attachments.map((i)=>{
        const url = i.url;
        const file = fileformat(url);
        return <Box>
          <a href={url}
          target="_blank"
          rel="noreferrer"
          download={file}
          style={

            {
              color: "black",
            }
          }>
           <FileOpen />
          </a>
          
        </Box>
        
        return <Avatar src={i} alt="Attachment" />
      }) : 'No Attachments';
      
    },
  },
  {
    field: "content",
    headerClassName: "table-header",
    headerName: "Content",
    width: 400,
  },
  {
    field: "sender",
    headerClassName: "table-header",
    headerName: "Sender",
    width: 140,
    renderCell: (params) => {
      return (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar src={params.row.sender.avatar} alt={params.row.sender.name} />
          <span>{params.row.sender.name}</span>
        </Stack>
      );
    },
  },
  {
    field: "chat",
    headerClassName: "table-header",
    headerName: "Chat",
    width: 200,
  },
  {
    field: "groupChat",
    headerClassName: "table-header",
    headerName: "Group Chat",
    width: 140,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      UsersDataForAdmin.messages.map((message) => ({
        ...message,
        id: message._id,
        content: message.content?.length>0? message.content : "No Content",
        sender: {
          name: message.sender.name,
          avatar: transformImage(message.sender.avatar, 50),
        },
        createdAt: moment(message.createdAt).format("DD/MM/YYYY hh:mm A"),
      }))
    );
  }, []); // Add empty dependency array to run only once
  console.log(rows);

  return (
    <AdminLayout>
      <Table columns={columns} heading={"All Messages"} rows={rows} />
    </AdminLayout>
  );
};

export default MessageManagement;
