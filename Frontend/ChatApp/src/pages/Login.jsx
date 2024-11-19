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
  Link,
  Box,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { emailValidator, passwordValidator } from "../utils/validators";
import image from "../assets/images/login.jpg";
import logo from "../assets/images/logo.png";
import { useDispatch } from "react-redux";
import { setRole, userExist } from "../Redux/reducers/auth";
import toast from "react-hot-toast";

const Login = () => {
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("", passwordValidator);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
        e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email: email.value,
        password: password.value,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(data)

      if (data.status) {
        localStorage.setItem("auth", data.token);
        console.log(data.token)
        localStorage.setItem("user", JSON.stringify(data.user));

        dispatch(userExist(data.user));
        dispatch(setRole(data.role));
        toast.success(data.message);
        console.log('reaching dashboard')

        if(data.role==="doctor"){
          console.log(data.role)
          navigate("/doctor/dashboard");
        }
        else if (data.role==="patient"){
          navigate("/dashboard");
        }
        
        
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      <Grid
        item
        md={6}
        display={{ xs: 'none', sm: "none", md: "block" }}
        paddingTop={5}
        sx={{
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
            padding: -5,
            position: 'absolute',
            top: 25,
            marginBottom: "20px",
            mt: -3,
          }}
        >
          <img src={logo} alt="MindWell" style={{ width: 200, height: 100 }} />
        </Box>
        <Box spacing={1} paddingTop={5}>
          <img src={image} alt="MindWell" style={{ width: "100%", height: "500px", borderRadius: '40px' }} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
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
            <Typography component="h1" variant="h5" textAlign="center" marginBottom={2}>
              Login
            </Typography>
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <TextField
                required
                fullWidth
                label="Phone number, user name, or email address"
                margin="normal"
                variant="outlined"
                value={email.value}
                onChange={email.changeHandler}
              />
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
                      <IconButton onClick={handlePasswordVisibilityToggle} edge="end">
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
                sx={{ marginTop: 2, backgroundColor: '#4C7E80', fontSize: '16px', height: '50px', color: 'white', padding: '10px 20px', borderRadius: '20px' }}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <img
                    src="https://developers.google.com/identity/images/g-logo.png"
                    alt="Google Logo"
                    style={{ width: 20, height: 20 }}
                  />
                }
                sx={{ marginTop: 2, height: '50px', color: 'black', padding: '10px 20px', borderRadius: '20px' }}
                onClick={() => alert("Google login not implemented yet")}
              >
                Continue with Google
              </Button>
              <Typography textAlign="center" marginTop={1}>
                <Link href="/forgetPassword" underline="hover" color={"black"}>
                  Forgot Password?
                </Link>
              </Typography>
              <Typography textAlign="center" marginTop={2}>
                Don't have an account? <Link href="/register" underline="hover">Sign up</Link>
              </Typography>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
