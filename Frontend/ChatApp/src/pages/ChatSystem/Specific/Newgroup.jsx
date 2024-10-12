import { useInputValidation } from "6pp";
import React, { useState } from "react";
import {
  Dialog,
  Stack,
  DialogTitle,
  Typography,
  Button,
  Avatar,
  ListItem,
  TextField,
  Skeleton,
} from "@mui/material";
import { sampleUsers } from "../../../Constants/sampleData";
import UserListItem from "../../../components/shared/UserListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewGroupMutation,
} from "../../../Redux/api";
import { setIsNewGroup } from "../../../Redux/reducers/misc";
import { useAsyncMutation, useErrors } from "../../../hooks/hooks";

const Newgroup = () => {
  const dispatch = useDispatch();
  const { isNewGroup } = useSelector((state) => state.misc);
  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);
  const groupName = useInputValidation("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  console.log(data);
  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);
  const submitHandler = () => {
    if (!groupName.value) return toast.error("Group name is required");

    if (selectedMembers.length < 2)
      return toast.error("Please Select Atleast 3 Members");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectedMembers,
    });

    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        maxWidth={"50rem"}
      >
        <DialogTitle variant="h5">New Group</DialogTitle>

        <TextField
          label={"Group Name"}
          variant={"outlined"}
          value={groupName.value}
          onChange={groupName.changeHandler}
        ></TextField>

        <Typography variant="h6">Members</Typography>

        <Stack>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"100px"} />
          ) : (
            data.friends?.map((user) => (
              <UserListItem
                user={user}
                key={user._id}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} spacing={"1rem"}>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
          <Button color="error" variant="outlined" onClick={closeHandler}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default Newgroup;
