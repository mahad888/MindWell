import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { passwordValidator } from "../../utils/validators";
import axios from "axios";

import logo from "../../assets/images/logo.png";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { adminExist } from "../../Redux/reducers/auth";

const isAdmin = true;

const AdminLogin = () => {
  const password = useInputValidation("", passwordValidator);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/auth/login",
        { secretKey: password.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);

      if (data.success) {
        localStorage.setItem("auth", data.token);
        dispatch(adminExist(data));
        toast.success(data.message);
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  

  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(5px)",
          height: "100%",
          padding: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            padding: 2,
            position: "absolute",
            top: 25,
            marginBottom: "20px",
          }}
        >
          <img src={logo} alt="MindWell" style={{ width: 200, height: 100 }} />
        </Box>
        <Container
          component="main"
          maxWidth="sm"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            height: "100%",
          }}
        >
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: { xs: 2, md: 4 },
              width: "100%",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              textAlign="center"
              marginBottom={2}
            >
              Admin Login
            </Typography>
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <TextField
                required
                fullWidth
                label="Password"
                margin="normal"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                value={password.value}
                onChange={password.changeHandler}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePasswordVisibilityToggle}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#4C7E80",
                  fontSize: "16px",
                  height: "50px",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "20px",
                }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;
