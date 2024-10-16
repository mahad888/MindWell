import React from 'react';
import { Avatar, Typography, Rating, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const DoctorProfile = ({ doctor }) => {
  // Extract the doctor's feedback from Redux state
  const { feedback } = useSelector((state) => state.auth);

  // Destructure avgRating and totalRating from feedback (fallback to 0 if undefined)
  const { avgRating = 3, totalRating = 10 } = feedback || {};
  console.log(feedback);

  return (
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <Avatar
        src={doctor.avatar.url}
        alt={doctor.name}
        sx={{ width: 120, height: 120 }}
      />
      <Typography variant="h5" fontWeight="bold">
        {doctor.name}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {doctor.specialization}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Rating value={avgRating} readOnly precision={0.5} />
        <Typography variant="body2">({totalRating} reviews)</Typography>
      </Stack>
    </Stack>
  );
};

export default DoctorProfile;
