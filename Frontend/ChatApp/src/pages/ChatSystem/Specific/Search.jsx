import React, { useEffect, useState } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { useInputValidation } from '6pp';
import { Dialog, DialogTitle, List, Stack, TextField } from '@mui/material';
import UserListItem from '../../../components/shared/UserListItem.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../../Redux/reducers/misc.js';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../../Redux/api.js';
import toast from 'react-hot-toast';
import { useAsyncMutation } from '../../../hooks/hooks.jsx';

const Search = () => {
  const search = useInputValidation('');
  const [sendFriendRequest,isLoadingSendFriendRequest] =  useAsyncMutation( useSendFriendRequestMutation);
  const addFriendHandler = async (id) => {
  
  await sendFriendRequest("Sending friend request",{ userId: id });
    
  };
  let isLoadingRequest = false;
  const [user, setUser] = useState([]);
  const {isSearch} = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };
  const [searchUser]= useLazySearchUserQuery();
  useEffect(() => {
    const timeOut = setTimeout(() => {

    if (search.value) {
      console.log("search value:",search.value);
      searchUser(search.value).then(({data}) => {
      setUser(data.users); 
      })
      .catch((e)=>console.log(e))
    }
  }, 1000);
  return () => clearTimeout(timeOut);
  },[search.value]);


  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}
   >
      <Stack
        p={'2rem'}
        direction={'column'}
        width={'30rem'}
        border={'3px solid #ccc'}
        
      >
        <DialogTitle>
          Find People
        </DialogTitle>
        <TextField
          label={'Search'}
          variant={'outlined'}
          value={search.value}
          onChange={search.changeHandler}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
        />
        <List>
          {user.map((user) => (
            <UserListItem 
              user={user} 
              key={user._id} 
              handler={addFriendHandler} 
              handlerIsloading={isLoadingSendFriendRequest} 
            />
          ))}
        </List>
      </Stack>
      
    </Dialog>
  );
};

export default Search;
