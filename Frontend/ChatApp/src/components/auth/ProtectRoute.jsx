
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton } from "@mui/material";
import { setUserFromStorage } from "../../Redux/reducers/auth";

const ProtectRoute = ({ isProtected, redirectTo = "/login" }) => {
  const dispatch = useDispatch();
  const { user,loading } = useSelector((state) => state.auth);
  const [checkingAuth, setCheckingAuth] = useState(true);
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); // Fetch user from localStorage
    if (storedUser) {
      dispatch(setUserFromStorage(JSON.parse(storedUser))); // Restore user from localStorage
    }
    setCheckingAuth(false);
  }, [dispatch]);

  // While we are checking user authentication status
  if (loading || checkingAuth) {
    return <Skeleton />; // Or a more sophisticated loading spinner
  }

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtected && !user) {
    return <Navigate to={redirectTo} />;
  }

  // If the route is public and the user is authenticated, redirect to the dashboard
  if (!isProtected && user?.role?.toLowerCase() === "patient") {
    return <Navigate to="/mind-well" />;
  }

  if (!isProtected && user?.role?.toLowerCase() === "doctor") {
    return <Navigate to="/doctor/dashboard" />;
  }
  // Render the child routes if the authentication check passes
  return <Outlet />;
};

export default ProtectRoute;