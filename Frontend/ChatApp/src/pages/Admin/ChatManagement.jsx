import React, { useState,useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import { UsersDataForAdmin } from "../../Constants/sampleData";
import { Avatar,AvatarGroup, Stack } from "@mui/material";
import { transformImage } from "../../lib/features";


const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "avatar",
    headerClassName: "table-header",
    headerName: "Avatar",
    width: 70,
    renderCell: (params) => {
      return (
        <AvatarGroup max={4} 
        sx={{
          position: "relative",
        }}
        > 
          {
            params.row.avatar?.map((item, index) => (
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
      )
    }

  },
  {
    field: "name",
    headerClassName: "table-header",
    headerName: "Name",
    width: 200,
  },
  {
    field: "totalMembers",
    headerClassName: "table-header",
    headerName: "Total Members",
    width: 120,
  },
  {
    field: "members",
    headerClassName: "table-header",
    headerName: "Members",
    width: 120,
    renderCell: (params) => {
      return (
        <AvatarGroup max={4} 
        sx={{
          position: "relative",
        }}
        > 
          {params.row.members.map((item, index) => (
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
      )
    }

  },
  {
    field: "totalMessages",
    headerClassName: "table-header",
    headerName: "Total Messages",
    width: 140,
  },
  {
    field: "creator",
    headerClassName: "table-header",
    headerName: "Created By",
    width: 250,
    renderCell: (params) => {
      return (
         <Stack direction={'row'} alignItems={'center'} spacing={'1rem '}>
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
        <span>{params.row.creator.name}</span>

      </Stack>
      )

    }
  },

];

const ChatManagement = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(UsersDataForAdmin.chats.map((i) => ({
      ...i,id:i._id,avatar:i.avatar,
      members:i.members.map((item) => transformImage(item.avatar,50)),

    })));
  },[])
  

  return (
    <AdminLayout>
      <Table heading={"Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatManagement;
