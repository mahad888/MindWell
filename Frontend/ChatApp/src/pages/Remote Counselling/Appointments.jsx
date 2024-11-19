import React, { useState, useEffect } from "react";
import Table from "../../components/shared/Table";
import { Avatar } from "@mui/material";
import { transformImage } from "../../lib/features";
import DoctorLayout from "../../components/Layout/DoctorLayout";
import { Done } from "@mui/icons-material";
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
    renderCell: (params) => <Avatar src={params.row.avatar} alt={params.row.name} />,
  },
  {
    field: "name",
    headerClassName: "table-header",
    headerName: "Name",
    width: 180,
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
    renderCell: (params) => params.value, // Render JSX
  },
  {
    field: "bookedon",
    headerClassName: "table-header",
    headerName: "Booked on",
    width: 140,
  },
];

const Appointments = () => {
  const [rows, setRows] = useState([]);
  const [patient, setPatient] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth");

  useEffect(() => {
    if (!token) {
      setError("Authorization token not found.");
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/doctor/appointments", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setPatient(data.bookings);
        console.log(data.bookings);
      } catch (err) {
        console.error(err);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    setRows(
      patient.map((booking) => ({
        ...booking,
        id: booking.patient._id,
        avatar: transformImage(booking.patient.avatar.url, 50),
        bookedon: new Date(booking.createdAt).toLocaleDateString(),
        name: booking.patient.name,
        email: booking.patient.email,
        gender: booking.patient.gender,
        payment: booking.isPaid ? <Done /> : "Not Paid",
      }))
    );
  }, [patient]);

  return (
    <DoctorLayout>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Table heading={"All Appointments"} columns={columns} rows={rows} />
    </DoctorLayout>
  );
};

export default Appointments;
