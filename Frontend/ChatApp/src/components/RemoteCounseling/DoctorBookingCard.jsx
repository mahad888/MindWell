import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorBookingCard = ({ doctor }) => {
  const token = localStorage.getItem('auth');
  const doctorId = doctor._id;
  const navigate = useNavigate()

  const handleVideoCalling = () => {
    navigate(`/video-counselling`)
  }
  const handleBooking = async()=>{
    try {
      const response = await axios.post(`http://localhost:5000/api/checkout-session/${doctorId}`,{}, {
        withCredentials: true,
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}` }
        }) 

        const {data}= response
        console.log(data)
        if(data.session.url){
          window.location.href = data.session.url

        }
      
      }
    catch (error) {
      toast.error('Failed in appointment booking', {
        position: "top-center",
        autoClose: 5000,
      });

      
    }
    
  }
  return (
    <Card sx={{ padding: 2, marginTop: 4 }}>
      <CardContent>
        <Typography variant="h6">Consultation Fee: ${doctor?.ticketPrice}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Available Slots: {doctor?.availableSlots?.join(', ')}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleVideoCalling}> 
          Book an Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorBookingCard;
