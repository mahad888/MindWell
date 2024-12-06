import { Add as AddIcon, Delete as DeleteIcon, Done, Edit, KeyboardBackspace, Menu, Save } from "@mui/icons-material";
import {
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Avatar,
  AvatarGroup,
  TextField,
  Button,
  Backdrop,
  Skeleton,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { chats as sampleChats, sampleUsers } from "../../Constants/sampleData";
import { Link } from "../../components/styles/StyledComponent";
import { useSearchParams } from "react-router-dom";
import UserListItem from '/src/components/shared/UserListItem'
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../../Redux/api";
import { useAsyncMutation, useErrors } from "../../hooks/hooks";


const ConfirmDeleteDialog = lazy(() => import("../../components/dialogs/confirmDeleteDialog"));
const AddMemberDialog = lazy(() => import("../../components/dialogs/AddMemberDialog"));


const Groups = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdated, setGroupNameUpdated] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false); 
  const chatId = useSearchParams()[0].get("group");

  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const [members, setMembers] = useState([]);
  const myGroups = useMyGroupsQuery("");
  const groupDetails = useChatDetailsQuery(
    { chatId, populate:true},{ skip: !chatId },
  )
  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation
  );

  // const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
  //   useRemoveGroupMemberMutation
  // );

  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation
  );

  const errors = [{
    isError: myGroups.isError,
    error: myGroups.error
  },
  {
    isError: myGroups.isError,
    error: myGroups.error
  }
]
useErrors(errors);

useEffect(() => {
  const groupData = groupDetails.data;
  if (groupData) {
    setGroupName(groupData.chat.name);
    setGroupNameUpdatedValue(groupData.chat.name);
    setMembers(groupData.chat.members);
  }

  return () => {
    setGroupName("");
    setGroupNameUpdatedValue("");
    setMembers([]);
    setIsEdit(false);
  };
}, [groupDetails.data]);

const navigateBack = () => {
  navigate("/");
};

  const isAddMember = false;

  const handelMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleName = () => {
    setIsEdit(false);
    console.log(groupNameUpdated);
    // setGroupName(groupNameUpdated)
  };
  

  const deleteHandler = () => {
    console.log("Delete");
  }

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const ConfirmDeletehandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Delete");  
  }
  const OpenAddMemberHandler=()=>{
    console.log("Add Member");
  }

  const closeConfirmDeletehandler = () => {
    setConfirmDeleteDialog(false);
  }
  // const removeMemberHandler = (userId) => {
  //   removeMember('Removing Member..',{chatId,userId})
  // }

  useEffect(() => {
    if(chatId){
      setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdated(`Group Name ${chatId}`);

    }
    
    return () => {
      setGroupName("");
      setGroupNameUpdated("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = () => {
    return (
      <>
        <IconButton
          sx={{
            display: { xs: "block", sm: "none" },
            position: "fixed",
            top: "1rem",
            right: "1rem",
          }}
          onClick={handelMobile}
        >
          <Menu />
        </IconButton>

        <Tooltip title="back">
          <IconButton
            sx={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "grey",
              },
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            <KeyboardBackspace />
          </IconButton>
        </Tooltip>
      </>
    );
  };

  const GroupName = () => {
    return (
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"1rem"}
        padding={"1rem"}
      >
        {isEdit ? (
          <>
            <TextField
              autoFocus
              label="Group Name"
              variant="standard"
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />

            <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}>
              <Done />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton
              onClick={() => {
                setIsEdit(true);
                disabled ={isLoadingGroupName}
              }}
            >
              <Edit />
            </IconButton>
          </>
        )}
      </Stack>
    );
  };
  const ButtonGroup = (
    <Stack
      direction={{
        xs:'column-reverse',
        sm:"row"}}

      justifyContent={"center"}
      alignItems={"center"}
      spacing={"1rem"}
      padding={{
        sm: "1rem",
        xs: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button size = 'large' color="error" variant="outlined" startIcon ={<DeleteIcon/>} onClick={ConfirmDeletehandler}>Delete Group</Button>
      {/* <Button size = 'large'>Leave Group</Button> */}
      <Button size = 'large' variant="contained" startIcon={<AddIcon/>} onClick={OpenAddMemberHandler}>Add Members</Button>
    </Stack>
  );
  return myGroups.isLoading ?<Skeleton></Skeleton>:
   (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "block" },
          borderRight: "1px solid #ccc",
        }}
        sm={4}
       // bgcolor="#72A0C1"
      >
        <GroupList myGroups={myGroups?.data.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          alignItems: "center",
          padding: "1rem 3rem",
        }}
      >
        <IconBtns />
        {groupName && (
          <>
            <GroupName />

            <Typography
              margin={`2rem`}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"#f5f5f5"}
              borderRadius={"1rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* removeMemberHandler(user._id) */}
              {members?.map((user) => (
                <UserListItem key={user._id} user={user} isAdded handler={''} styling={
                  {
                    boxShadow: "0 0 5px 0 #ccc",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }
                } />
              ))}

            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && <Suspense fallback={<Backdrop open/>}> <AddMemberDialog/></Suspense>}

      {confirmDeleteDialog &&  <Suspense fallback={<Backdrop  open/>}>
      <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeletehandler} />
      </Suspense>}

      <Drawer
        open={isMobileMenuOpen}
        onClick={handleMobileClose}
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};
const GroupList = ({ w = "100%", myGroups = [], chatId }) => {
  return (
  <Stack width={w} sx={{
    height: "100vh",
    overflow: "auto",

  }}>
      {myGroups.length === 0 ? (
        <Typography textAlign={"center"} padding={"1rem"}>
          No Groups
        </Typography>
      ) : (
        myGroups.map((group) => (
          <GroupListItem key={group._id} group={group} chatId={chatId} />
        ))
      )}
    </Stack>
  );
};
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        padding="1rem"
        borderBottom="1px solid #f1f1f1"
        spacing={"1rem"}

      >
        <AvatarGroup max={4}
        sx={{
          position: "relative",
        }}
        >
          {avatar &&
            avatar.map((item, index) => (
              <Avatar
                src={item}
                key={index}
                alt={`Avatar ${index}`}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginLeft: index !== 0 ? "-35px" : "0",
                }}
              />
            ))}
        </AvatarGroup>

        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default memo(Groups);
