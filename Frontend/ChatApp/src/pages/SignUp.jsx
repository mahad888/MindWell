import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Avatar,
  MenuItem,
  Link,
  Stack,
  Box,
} from "@mui/material";
import { CameraAlt as CameraAltIcon, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFileHandler, useInputValidation } from "6pp";
import { emailValidator, nameValidator, passwordValidator } from "../utils/validators";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import image from "../assets/images/login.jpg";
import toast from "react-hot-toast";

const SignUp = () => {
  const name = useInputValidation("", nameValidator);
  const bio = useInputValidation("");
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("", passwordValidator);
  const confirmPassword = useInputValidation("", (value) => {
    if (value !== password.value) {
      return { isValid: false, errorMessage: "Passwords do not match" };
    }
    return { isValid: true, errorMessage: "" };
  });

  const gender = useInputValidation("");
  const role = useInputValidation("");
  const avatar = useFileHandler("single");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("confirmPassword", confirmPassword.value);
      formData.append("name", name.value);
      formData.append("bio", bio.value);
      formData.append("role", role.value);
      formData.append("avatar", avatar.file);
      formData.append("gender", gender.value);
      

      const response = await axios.post("http://localhost:5000/api/v1/auth/register", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", error);
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
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 255, 255, 0.8)",
          height: "100%",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: -10,
            mb: 2,
            ml: 2,
            width: "100%",
          }}
        >
          <img src={logo} alt="MindWell" style={{ width: 200, height: 100 }} />
        </Box>

        <img
          src={image}
          alt="MindWell"
          style={{ width: "100%", height: "500px", opacity: 1, marginLeft: '50px', borderRadius: '40px' }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <Container
          component="main"
          maxWidth="md"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "20px",
            height: "auto",
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
              maxWidth: 600,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography component="h1" variant="h5" textAlign="center" marginBottom={2}>
              Register
            </Typography>
            <form onSubmit={handleRegister} style={{ width: "100%" }}>
              <Stack position="relative" width="10rem" margin="auto">
                <Avatar
                  sx={{ width: "10rem", height: "10rem", margin: "auto", marginBottom: 1, objectFit: "contain" }}
                  src={avatar.file ? URL.createObjectURL(avatar.file) : ""}
                />
                {avatar.error && (
                  <Typography color="error" variant="caption">
                    {avatar.error}
                  </Typography>
                )}
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    color: "white",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    ":hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                    borderRadius: "50%",
                  }}
                  component="label"
                >
                  <CameraAltIcon />
                  <input type="file" hidden onChange={avatar.changeHandler} />
                </IconButton>
              </Stack>
              <TextField
                required
                fullWidth
                label="Full Name"
                margin="normal"
                variant="outlined"
                value={name.value}
                onChange={name.changeHandler}
                error={!!name.error}
                helperText={name.error || ""}
              />
              <TextField
                required
                fullWidth
                label="Email"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
                error={!!email.error}  
                helperText={email.error || ""}
              />
              <Stack direction={"row"} spacing={1} margin="auto">
                <TextField
                  required
                  fullWidth
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={password.value}
                  onChange={password.changeHandler}
                  error={!!password.error}  
                  helperText={password.error || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  margin="normal"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword.value}
                  onChange={confirmPassword.changeHandler}
                  error={!!confirmPassword.error}  
                  helperText={confirmPassword.error || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={1} margin="auto" sx={{ margin: 2 }}>
                <TextField
                  select
                  required
                  fullWidth
                  label="Gender"
                  margin="normal"
                  variant="outlined"
                  value={gender.value}
                  onChange={gender.changeHandler}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
                <TextField
                  select
                  required
                  fullWidth
                  label="Role"
                  margin="normal"
                  variant="outlined"
                  value={role.value}
                  onChange={role.changeHandler}
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                </TextField>
              </Stack>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                sx={{
                  marginTop: 2,
                  backgroundColor: '#4C7E80',
                  fontSize: '16px',
                  height: '50px',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '20px',
                }}
              >
                Register
              </Button>
              <Typography textAlign="center" marginTop={2}>
                Already have an account?{" "}
                <Link href="/login" underline="hover">
                  Login
                </Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUp;
