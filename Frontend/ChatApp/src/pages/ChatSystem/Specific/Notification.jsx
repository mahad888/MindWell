import { Dialog, Stack, DialogTitle, Typography,Button, Avatar, ListItem, Skeleton } from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../../Constants/sampleData";
import { transformImage } from "../../../lib/features";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../../Redux/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../../Redux/reducers/misc";
import toast from "react-hot-toast";

const Notification = () => {

  const {data, isLoading, isError} = useGetNotificationsQuery()
  const {isNotification}= useSelector(state=>state.misc)
  const dispatch = useDispatch();
  const [acceptRequest]= useAcceptFriendRequestMutation()
  const friendRequestHandler = async ({_id, accept}) => {
    dispatch(setIsNotification(false));
    try{

    const response = await acceptRequest({requestId:_id, accept})
    if(response.data?.success){
      console.log("Use SocketHere")

    }
    else{
    toast.error(response?.data?.error || "Something went wrong");
    }
    } 
    catch(error){
      console.log(error);
    toast.error(response?.data?.error || "Something went wrong");

   }
  
}
const closeHandler = () => {
  dispatch(setIsNotification(false));
}

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"50rem"}>
        <DialogTitle>Notification</DialogTitle>
        {
          isLoading?<Skeleton/>:
          <>
          {data?.allRequests?.length > 0 ? (
          data?.allRequests?.map((i) => (
            <NotificationItem
              key={i._id}
              _id={i._id}
              sender={i.sender}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notifications</Typography>
        )}
          </>

        }
      </Stack>
    </Dialog>
  );
};
const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <ListItem>
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding={'1rem'}
      spacing={"1rem"}

    >
      <Avatar src= { transformImage(sender.avatar)} />


      <Typography
       variant='body1'
       sx={{
         flexGrow: 1,
         display: "-webkit-box",
         WebkitBoxOrient: "vertical",
         overflow: "hidden",
         WebkitLineClamp: 1,
         textOverflow: "ellipsis",
         width:"100%"
         
         
       }}>{sender.name}</Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained" onClick={() => handler({ _id, accept: true })}>Accept</Button>
        <Button color="error" variant="outlined" onClick={() => handler({ _id, accept: false })}>Reject</Button>
      </Stack>
    </Stack>
    </ListItem>
  
  );
});

export default Notification;
