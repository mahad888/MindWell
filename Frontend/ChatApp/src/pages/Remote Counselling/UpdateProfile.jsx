import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
  Grid,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CameraAlt as CameraAltIcon ,Delete as DeleteIcon} from "@mui/icons-material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFileHandler } from "6pp";
import DoctorFeedback from "../../components/RemoteCounseling/DoctorFeedBack";
import DoctorLayout from "../../components/Layout/DoctorLayout";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import S from "string";
import { userExist } from "../../Redux/reducers/auth";

const specializationOptions = [
  "Psychiatrist",
  "Psychologist",
  "Clinical Social Worker",
  "Counselor/Therapist",
  "Psychiatric Nurse Practitioner",
  "Neurologist",
  "Addiction Specialist",
  "Geriatric Psychiatrist",
  "Child and Adolescent Psychiatrist",
];



const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]; //


const UpdateProfile = () => {
const {user} = useSelector(state => state.auth);
const dispatch = useDispatch()

  const [doctorInfo, setDoctorInfo] = useState({
    name: user?.name,
    email: user?.email,
    bio: user?.bio,
    about: user?.about,
    specialization: user?.specialization,
    appointmentFee: "",
    avatar:"",
    experiences: [
      { startDate: dayjs(), endDate: dayjs(), position: "", hospital: "" },
    ],
    qualifications: [
      { startDate: dayjs(), endDate: dayjs(), degree: "", university: "" },
    ],
    timeSlots: [{ day: "", startTime: dayjs(), endTime: dayjs() }],
  });
  const [avatar, setAvatar] = useState({  file: null,
    previewUrl: user?.avatar?.url,});
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", email: "" };

    if (doctorInfo?.name?.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(doctorInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const addExperience = () => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        { startDate: dayjs(), endDate: dayjs(), position: "", hospital: "" },
      ],
    }));
  };

  const addTimeSlot = () => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      timeSlots: [
        ...prevState.timeSlots,
        { day: "", startTime: dayjs(), endTime: dayjs() },
      ],
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Optionally transform the image URL for preview (using a utility function like URL.createObjectURL or custom transformation)
      setAvatar((prev) => ({ ...prev, file: file, previewUrl: URL.createObjectURL(file) }))
    }
  }


  const handleInputChange = (e, index, field, type) => {
    const newValues = [...doctorInfo[type]];
    newValues[index][field] = e;
    setDoctorInfo({ ...doctorInfo, [type]: newValues });
  };

  const handleProfileChange = (e) => {
    setDoctorInfo({ ...doctorInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setDoctorInfo({ ...doctorInfo, specialization: e.target.value });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperiences = doctorInfo.experiences.map((exp, idx) =>
      idx === index ? { ...exp, [field]: value } : exp
    );
    setDoctorInfo({ ...doctorInfo, experiences: updatedExperiences });
  };

  

  // Remove experience
  const removeExperience = (index) => {
    const updatedExperiences = doctorInfo.experiences.filter(
      (_, idx) => idx !== index
    );
    setDoctorInfo({ ...doctorInfo, experiences: updatedExperiences });
  };

  // Handle qualification change
  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = doctorInfo.qualifications.map((qual, idx) =>
      idx === index ? { ...qual, [field]: value } : qual
    );
    setDoctorInfo({ ...doctorInfo, qualifications: updatedQualifications });
  };


  // Remove qualification
  const removeTimeSlots = (index) => {
    const updatedTimeSlots= doctorInfo.timeSlots.filter(
      (_, idx) => idx !== index
    );
    setDoctorInfo({ ...doctorInfo, timeSlots: updatedTimeSlots });
  };
const token = localStorage.getItem("auth");

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
      formData.append('name', doctorInfo.name);
      formData.append('email', doctorInfo.email);
      formData.append('bio', doctorInfo.bio);
      formData.append('about', doctorInfo.about);
      formData.append('specialization', doctorInfo.specialization);
      formData.append('appointmentFee', doctorInfo.appointmentFee);
      formData.append('avatar', avatar.file); 
      formData.append("experiences",doctorInfo.experiences)
      formData.append("timeSlots",doctorInfo.timeSlots)

        const response = await axios.put("http://localhost:5000/api/updateDoctor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
        });

        console.log("Profile updated successfully:", response.data);
        
        dispatch(userExist(response.data))
        toast.success("Profile updated successfully");
        // Handle success (e.g., show a success message, redirect, etc.)
      } catch (error) {
        console.error("There was an error updating the profile:", error);
        // Handle error (e.g., show an error message)
      }
    }
  };

  return (
    <DoctorLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          sx={{
            padding: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={5}
            sx={{ padding: 4, width: "80%", borderRadius: 2 }}
          >
            <Typography variant="h4" gutterBottom>
              Update Profile Information
            </Typography>
            <Grid container spacing={3}>
              {/* Avatar */} <Grid item xs={12} container justifyContent="center">
                <Stack position="relative" width="15rem" height="15rem">
                  <Avatar
                    sx={{
                      width: "15rem",
                      height: "15rem",
                      margin: "auto",
                      objectFit: "cover",
                      border: "4px solid #1976d2",
                    }}
                    src={avatar?.previewUrl} // Display the selected image
                  />
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
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleAvatarChange} // Handle avatar change
                    />
                  </IconButton>
                </Stack>
              </Grid>
              {/* Name and Email Fields Side by Side */}
              <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={doctorInfo.name}
                    onChange={handleProfileChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={doctorInfo.email}
                    onChange={handleProfileChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio (Max 50 characters)"
                  name="bio"
                  value={doctorInfo.bio}
                  onChange={handleProfileChange}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="About"
                  name="about"
                  value={doctorInfo.about}
                  onChange={handleProfileChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Specialization</InputLabel>
                  <Select
                    value={doctorInfo.specialization}
                    onChange={handleSelectChange}
                    label="Specialization"
                  >
                    {specializationOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Appointment Fee in $"
                  name="appointmentFee"
                  type="number"
                  value={doctorInfo.appointmentFee}
                  onChange={handleProfileChange}
                />
              </Grid>
              {/* Experiences */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Experience
                </Typography>

                <Button variant="contained" onClick={addExperience}>
                  Add Experience
                </Button>
              </Grid>
              {doctorInfo?.experiences?.map((experience, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={experience.startDate}
                      onChange={(date) =>
                        handleInputChange(
                          date,
                          index,
                          "startDate",
                          "experiences"
                        )
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={experience.endDate}
                      onChange={(date) =>
                        handleInputChange(date, index, "endDate", "experiences")
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={experience.position}
                      onChange={(e) =>
                        handleExperienceChange(index, "position", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Hospital"
                      value={experience.hospital}
                      onChange={(e) =>
                        handleExperienceChange(index, "hospital", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item>
                      <IconButton
                        onClick={() => removeExperience(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>

                </React.Fragment>
              ))}
              {/* Qualifications */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Qualifications
                </Typography>
              </Grid>
              {doctorInfo?.qualifications?.map((qualification, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={qualification.startDate}
                      onChange={(date) =>
                        handleInputChange(
                          date,
                          index,
                          "startDate",
                          "qualifications"
                        )
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={qualification.endDate}
                      onChange={(date) =>
                        handleInputChange(
                          date,
                          index,
                          "endDate",
                          "qualifications"
                        )
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Degree"
                      value={qualification.degree}
                      onChange={(e) =>
                        handleQualificationChange(index, "degree", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="University"
                      value={qualification.university}
                      onChange={(e) =>
                        handleQualificationChange(index, "university", e.target.value)
                      }
                    />
                  </Grid>
                </React.Fragment>
              ))}
              {/* Time Slots */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Available Time Slots
                </Typography>
                <Button variant="contained" onClick={addTimeSlot}>
                  Add Time Slot
                </Button>
              </Grid>
              {doctorInfo?.timeSlots?.map((timeSlot, index) => (
                <Grid item xs={12} container spacing={2} key={index}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Day</InputLabel>
                      <Select
                        value={timeSlot.day}
                        onChange={(e) =>
                          handleInputChange(
                            e.target.value,
                            index,
                            "day",
                            "timeSlots"
                          )
                        }
                        label="Day"
                      >
                        {daysOfWeek.map((day) => (
                          <MenuItem key={day} value={day}>
                            {day}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TimePicker
                      label="Start Time"
                      value={timeSlot.startTime}
                      onChange={(time) =>
                        handleInputChange(time, index, "startTime", "timeSlots")
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TimePicker
                      label="End Time"
                      value={timeSlot.endTime}
                      onChange={(time) =>
                        handleInputChange(time, index, "endTime", "timeSlots")
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />

                  </Grid>
                  <Grid item>
                      <IconButton
                        onClick={() => removeTimeSlots(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                </Grid>
              ))}
              
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </LocalizationProvider>
    </DoctorLayout>
  );
};

export default UpdateProfile;
