import { Add, Remove } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItem, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import { transformImage } from '../../lib/features';

const UserListItem = ({
  user,
  handler,
  handlerIsloading,
  isAdded=false,
  styling

}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'1rem'}
        spacing={"1rem"}
        {...styling}

      >
        <Avatar src={ transformImage(avatar)} />
        <Typography
          variant='body1'
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 1,
            textOverflow: "ellipsis",
            width:"100%",
            marginRight: 'auto' 
            
            
          }}
        >
          {name}
        </Typography>

        <Box sx={{flexGrow:1}}></Box>

        
        
        <IconButton
          size='small'
          sx={{
            backgroundColor: isAdded ? 'red' : 'primary.main',
            color: 'white',
            "&:hover": {
              backgroundColor: isAdded ? 'grey' : 'primary.dark',
              
            }
          }}
          onClick={() => { handler(_id) }} 
          disabled={handlerIsloading}
        >
          {isAdded ?<Remove/>:<Add/>}
          
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserListItem);
