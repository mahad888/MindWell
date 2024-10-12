import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import { Face as FaceIcon, AlternateEmail as UserIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { transformImage } from '../../../lib/features'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  return (
    <Stack
      spacing={"3rem"}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: 'center', // Center content vertically
        alignItems: "center", // Center content horizontally
      }}
    >
      <Avatar
        sx={{
          width: 200,
          height: 200,
          margin: "auto",
          border: "5px solid #f1f1f1",
        }}
        src={transformImage(user.avatar.url)}
      />

      {/* Profile Cards */}
      <ProfileCard heading={"Name"} text={user.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user.createdAt).fromNow()} Icon={<CalenderIcon />} />
    </Stack>
  )
}

const ProfileCard = ({ heading, Icon, text }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"} // Center items horizontally
      spacing={1} // Space between the icon and text
      sx={{
        width: "100%",
        textAlign: "center", // Center text
      }}
    >
      {Icon && <span>{Icon}</span>}
      <Stack>
        <Typography variant={'h6'}>{text}</Typography>
        <Typography variant={"caption"}>{heading}</Typography>
      </Stack>
    </Stack>
  )
}

export default Profile
