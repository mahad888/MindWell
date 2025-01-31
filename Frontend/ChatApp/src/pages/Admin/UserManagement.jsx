import React, { useState, useEffect } from "react";
import AdminLayout from "../../components/Layout/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";
import axios from "axios";

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
    },
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
    field: "role",
    headerClassName: "table-header",
    headerName: "Role",
    width: 140,
  },
  {
    field: "friends",
    headerClassName: "table-header",
    headerName: "Friends",
    width: 140,
  },
  {
    field: "groups",
    headerClassName: "table-header",
    headerName: "Groups",
    width: 140,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/patients", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPatients(data.transformedPatients.reverse());
        console.log(data.transformedPatients);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRows(
      patients.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImage(user.avatar, 50),
      }))
    );
  }, [patients]); // Add 'patients' as a dependency

  return (
    <AdminLayout>
      <Table heading={"All Patients"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default UserManagement;
