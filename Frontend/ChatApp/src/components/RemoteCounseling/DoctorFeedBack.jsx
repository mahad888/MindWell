import React, { useState, useEffect } from 'react';
import { Box, Typography, Rating, TextField, Button, Stack, Paper, Avatar, List, ListItem, ListItemAvatar, Divider } from '@mui/material';
import toast from 'react-hot-toast';
import axios from 'axios';

const DoctorFeedback = ({ doctor }) => {
  const [reviews, setReviews] = useState([]); // Initialize with an empty array
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [displayReviews, setDisplayReviews] = useState(false);

  const token = localStorage.getItem('auth');
  const doctorId = doctor._id;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/feedback/${doctorId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        if (response.status === 200) {
          setReviews(response?.data.feedback || []);  // Set reviews or default to empty array
          console.log(response?.data.feedback);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        toast.error('Failed to fetch reviews.', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };

    if (doctor) {
      fetchReviews();
    }
  }, [doctor]);

  const handleDisplayReviews = () => {
    setDisplayReviews((prev) => !prev);
  };

  const handleAddReview = async () => {
    if (rating && comment.trim()) {
      try {
        const { data, status } = await axios.post(`http://localhost:5000/api/doctor/feedback/${doctorId}`, {
          rating,
          comment,
        }, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (status === 201) {
          const newReview = data.review;
          setReviews([...reviews, newReview]); // Spread reviews safely
          setRating(0);
          setComment('');
          toast.success('Review added successfully!', {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          throw new Error('Failed to add review');
        }
      } catch (error) {
        toast.error('Failed to submit review.', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } else {
      toast('Please provide a rating and a comment.', {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  return (
    <Stack spacing={3} sx={{ marginTop: 4 }}>
      <List sx={{ width: '100%', maxWidth: 700, maxHeight: 300, bgcolor: 'background.paper', overflowY: 'auto' }}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Patients Feedback
        </Typography>
        <Button variant='outlined' sx={{ width: '10rem', position: 'relative', left: '30rem' }} onClick={handleDisplayReviews}>
          {displayReviews ? 'Show less' : 'Show All'}
        </Button>
        {(displayReviews ? reviews : reviews?.slice(0, 2))?.map((review, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={review.avatar || ''} alt={review?.paitent || 'Anonymous'} />
              </ListItemAvatar>
              <Stack spacing={1} sx={{ width: '100%' }}>
                <Typography variant="body1">{review?.patient || 'Anonymous'}</Typography>
                <Rating value={review.rating} readOnly precision={0.5} />
                <Typography variant="body2">{review.comment}</Typography>
              </Stack>
            </ListItem>
            {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>

      <Paper sx={{ padding: 2, width: '40rem' }}>
        <Typography variant="h6">Add Your Review</Typography>
        <Rating value={rating} onChange={(e, newValue) => setRating(newValue)} sx={{ marginTop: 2 }} />
        <TextField
          label="Your Comment"
          fullWidth
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ marginTop: 2 }}
        />
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={handleAddReview}>
          Submit Review
        </Button>
      </Paper>
    </Stack>
  );
};

export default DoctorFeedback;
