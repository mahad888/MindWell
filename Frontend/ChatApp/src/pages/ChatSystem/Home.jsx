import React from 'react'
import AppLayout from '../../components/Layout/AppLayout'
import { Typography } from '@mui/material'

const Home = () => {
  return (
    <Typography 
      variant='h5'
      sx={{
        textAlign: 'center',
        marginTop: '2rem',
      }}
    >
      Select a friend to chat with 
    </Typography>
  )
}

export default AppLayout()(Home)