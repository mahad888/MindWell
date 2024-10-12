import React, { useState,useEffect } from "react";
import Table from "../../components/shared/Table";
import { UsersDataForAdmin } from "../../Constants/sampleData";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";
import DoctorLayout from "../../components/Layout/DoctorLayout";


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
    width: 140,
    renderCell: (params) => {
      return <Avatar src={params.row.avatar} alt={params.row.name} />;
    }

  },
  {
    field: "name",
    headerClassName: "table-header",
    headerName: "Name",
    width: 140,
  },
  {
    field: "email",
    headerClassName: "table-header",
    headerName: "Email",
    width: 200,
  },
  {
    field: "gender",
    headerClassName: "table-header",
    headerName: "Gender",
    width: 140,
  },
  {
    field: "payment",
    headerClassName: "table-header",
    headerName: "Payment",
    width: 140,
  },
  {
    field: "booked on",
    headerClassName: "table-header",
    headerName: "Booked on",
    width: 140,
  },

];

const Appointments = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(UsersDataForAdmin.users.map((user) => ({
      ...user,id:user._id,avatar:transformImage(user.avatar,50)
    })));
  },[])
  

  return (
    <DoctorLayout>
      <Table heading={"All Appoinments"} columns={columns} rows={rows} />
      </DoctorLayout>
  );
};

export default Appointments;
