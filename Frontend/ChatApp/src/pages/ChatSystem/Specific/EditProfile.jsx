import { Avatar, Stack, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Face as FaceIcon, AlternateEmail as UserIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { transformImage } from '../../../lib/features'
import { Edit } from 'lucide-react'
import { setIsEditProfile } from '../../../Redux/reducers/misc'
import axios from 'axios'

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth)
  const { isEditProfile } = useSelector((state) => state.misc)
  const dispatch = useDispatch()

  // State to manage dialog visibility and form data
  const [formData, setFormData] = useState({
    name: user.name,
    avatarUrl: user.avatar.url,
    avatarFile: null // Store the uploaded file
  })

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    dispatch(setIsEditProfile(false))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Optionally transform the image URL for preview (using a utility function like URL.createObjectURL or custom transformation)
      setFormData((prev) => ({ ...prev, avatarFile: file, avatarUrl: URL.createObjectURL(file) }))
    }
  }

  const handleSave = async () => {
    // Handle saving the updated profile data (including the avatar)
    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('name', formData.name)

      // Append avatar file only if a new one was selected
      if (formData.avatarFile) {
        formDataToSubmit.append('avatar', formData.avatarFile)
      }

      const token = localStorage.getItem('auth')

      // Call the API to update the user profile
      const response = await axios.put('http://localhost:5000/api/updatePatient', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
            Authorization: `Bearer ${token}` // Send the token in the
        },
      })

      console.log('Profile updated successfully:', response.data)
      // Dispatch an action or update the local state based on the response

    } catch (error) {
      console.error('Error updating profile:', error)
    }

    handleClose()
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Edit Profile
      </Button>

      <Dialog open={isEditProfile} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack
            spacing={"3rem"}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: 'center',
              alignItems: "center",
            }}
          >
            {/* Editable Avatar */}
            <Stack alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  margin: "auto",
                  border: "5px solid #f1f1f1",
                }}
                src={transformImage(formData.avatarUrl)}
              />
              <input
                accept="image/*"
                type="file"
                id="avatar-upload"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-upload">
                <Button variant="outlined" component="span">
                  Change Avatar
                </Button>
              </label>
            </Stack>

            {/* Editable Profile Cards */}
            <ProfileCard
              heading={"Name"}
              text={formData.name}
              onChange={handleChange}
              name="name"
              Icon={<FaceIcon />}
            />
            <ProfileCard
              heading={"Joined"}
              text={moment(user.createdAt).fromNow()}
              Icon={<CalenderIcon />}
              readOnly
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

// ProfileCard component, now supporting editable fields
const ProfileCard = ({ heading, Icon, text, onChange, name, readOnly }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={1}
      sx={{
        width: "100%",
        textAlign: "center",
      }}
    >
      {Icon && <span>{Icon}</span>}
      <Stack>
        {readOnly ? (
          <Typography variant={'h6'}>{text}</Typography>
        ) : (
          <TextField
            variant="outlined"
            fullWidth
            value={text}
            name={name}
            onChange={onChange}
            size="small"
          />
        )}
        <Typography variant={"caption"}>{heading}</Typography>
      </Stack>
    </Stack>
  )
}

export default EditProfile
