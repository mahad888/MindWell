import React ,{useState} from 'react'
import { Dialog,DialogContentText,DialogTitle,DialogActions, DialogContent,Button, Stack, Typography } from '@mui/material'
import { sampleUsers } from '../../Constants/sampleData'
import UserListItem from '/src/components/shared/UserListItem'
const AddMemberDialog = ({addMember,isLoadingAddmember,chatId}) => {

    const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

    
    const addMemberHandler = () => {
        closeDialogHandler();
    }
    const closeDialogHandler = () => {
          setSelectedMembers([]);
          setMembers([])
    }
  return (

<Dialog  open onClose={closeDialogHandler}>
    <Stack  p={'2rem'} spacing={'2rem'} width={'25rem'}>
    <DialogTitle alignSelf={'center'} >Add Member</DialogTitle>
    <Stack spacing={'1rem'}>
        {
           members.length > 0?  members.map((user)=>(
                <UserListItem key={user._id} user={user}  handler = {selectMemberHandler} isAdded={selectedMembers.includes(user._id)}/>
                
            )):(<Typography textAlign={"center"}>No Friends</Typography>)
        }
    </Stack>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>
        <Button variant={'contained'}  onClick={addMemberHandler} disabled={isLoadingAddmember}>Submit Changes</Button>
        <Button variant={'outlined'} color='error' onClick={closeDialogHandler}>Cancel</Button>
    </Stack>
    </Stack>

</Dialog>
    
  )
}

export default AddMemberDialog

