import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
  import Friend from "./Friends";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";

import FlexBetween from "../../utils/FlexBetween";
import WidgetWrapper from "../../utils/WidgetWrapper";
import { setPost } from "../../Redux/reducers/auth";
import axios from "axios";
  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
  }) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = localStorage.getItem("auth") 
    const {user} = useSelector((state) => state.auth);
    const loggedInUserId = user._id
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const patchLike = async () => {
      try {
        const post = await axios.patch(`http://localhost:5000/api/posts/${postId}/like`, 
          { userId: loggedInUserId }, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setPost({ post: post.data }));
      } catch (error) {
        console.error("Error updating like:", error);
      }
    };
   
    
  
    return (
      <WidgetWrapper sx={{
        width: { xs: "100%", md: "80%", lg: "100%" }, // Responsive width
        maxWidth: "1500px", // Max width limit for larger screens
        margin: "2rem 0", // Center the widget
      }}>
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width="100%"
            height="auto"
            alt="post"
            style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            src={picturePath}
          />
        )}
        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={patchLike}>
                {isLiked ? (
                  <FavoriteOutlined sx={{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>
        {isComments && (
          <Box mt="0.5rem">
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
  export default PostWidget;