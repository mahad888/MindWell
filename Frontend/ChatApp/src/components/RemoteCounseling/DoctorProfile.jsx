import React from 'react';
import { Box, Avatar, Typography, Rating, Stack } from '@mui/material';

const DoctorProfile = ({ doctor }) => {
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
        <Rating value={doctor.averageRating} readOnly precision={0.5} />
        <Typography variant="body2">({doctor.totalRating} reviews)</Typography>
      </Stack>
    </Stack>
  );
};

export default DoctorProfile;
