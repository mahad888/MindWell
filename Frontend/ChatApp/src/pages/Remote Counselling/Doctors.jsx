import React, { useEffect, useState } from "react";
import RemoteCounsellingLayout from "../../components/Layout/RemoteCounsellingLayout";
import DoctorCardsGrid from "../../components/shared/doctorCard";
import { Stack, CircularProgress } from "@mui/material";
import {
  CurveButton,
  Searchfield,
} from "../../components/styles/StyledComponent";
import axios from "axios";

const Doctors = () => {
  const [query, setQuery] = useState(""); // Controlled input value
  const [debouncedQuery, setDebouncedQuery] = useState(""); // Debounced value
  const [doctors, setDoctors] = useState([]); // Doctors data from API
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const token = localStorage.getItem("auth");

  // Update debounced query after 700ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);
    return () => clearTimeout(timer); // Clear timeout on cleanup
  }, [query]);

  // Fetch doctors from API when debounced query changes
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/getAllDoctors?query=${debouncedQuery}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(data.doctors); // Store doctor data in state
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    if (debouncedQuery || debouncedQuery === "") {
      fetchDoctors();
    }
  }, [debouncedQuery, token]);

  const handleChange = (e) => {
    setQuery(e.target.value); // Update query as the user types
  };

  return (
    <Stack>
      <Stack
        spacing={3}
        sx={{
          padding: { xs: "1rem", md: "2rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Searchfield
            placeholder="Search"
            value={query}
            onChange={handleChange}
          ></Searchfield>
          <CurveButton onClick={() => setDebouncedQuery(query)}>Search</CurveButton>
        </Stack>

        <h1>Our Doctors</h1>
        <p>
          Our team of highly qualified and experienced doctors are here to help
          you with your mental health issues. Book an appointment now!
        </p>
      </Stack>

      {/* Show loading indicator or error if applicable */}
      {loading ? (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <DoctorCardsGrid doctors={doctors} /> // Show doctors once loaded
      )}
    </Stack>
  );
};

export default RemoteCounsellingLayout(Doctors);
