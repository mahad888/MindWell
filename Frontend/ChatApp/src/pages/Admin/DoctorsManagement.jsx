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
    field: "appointmentFee",
    headerClassName: "table-header",
    headerName: "Appointment Fee",
    width: 140,
  },
  {
    field: "approvalStatus",
    headerClassName: "table-header",
    headerName: "Approval Status",
    width: 140,
  },
];

const DoctorManagement = () => {
  const [rows, setRows] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/doctors", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setDoctors(data.doctors.reverse());
        console.log(data.doctors);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setRows(
      doctors.map((user) => ({
        ...user,
        id: user._id,
        avatar: transformImage(user?.avatar?.url, 50),
        appointmentfee:user.appointmentFee,
        approvalStatus:user.isApproved

      }))
    );
  }, [doctors]); // Add 'patients' as a dependency

  return (
    <AdminLayout>
      <Table heading={"All Doctors"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default DoctorManagement;
