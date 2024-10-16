import React, { useCallback } from 'react'
import { Box, Button, Paper, Stack, TextField } from '@mui/material'
import { useInputValidation } from '6pp'
import { useNavigate } from 'react-router-dom'

const VideoCounselling = () => {

  const code = useInputValidation("")
  const navigate = useNavigate();
  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${code.value}`)
  }, [navigate, code.value])
  return (
    <Stack 
    justifyContent={'center'}
    alignItems={'center'}
    >
      <Paper 
      elevation={3}
     
      sx={{
        width: '50%',
        padding: '20px',
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'


      }}
      >

      
      <h1>Video Counselling</h1>
      <Box direction="row">
      <TextField
      type='text'
      label='Enter room code'
      variant='outlined'
      value={code.value}
      onChange={code.changeHandler}
      >

      </TextField>

      <Button onClick={handleJoinRoom}>
        Join
      </Button>
      </Box>


      </Paper>
    </Stack>
  )
}

export default VideoCounselling