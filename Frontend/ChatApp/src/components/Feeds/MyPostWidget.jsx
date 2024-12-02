import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import UserImage from "../../utils/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../../utils/FlexBetween";
import { setPosts } from "../../Redux/reducers/auth";
import WidgetWrapper from "../../utils/WidgetWrapper";
import axios from "axios";
import toast from "react-hot-toast";
import OptionsDialog from "../shared/OptionsDialoge";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { _id } = user;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOptionsDialogOpen(false); // Close the dialog when needed
  };


  const handlePost = async () => {
    const formData = new FormData();
    formData.append("id", _id);
    formData.append("description", post);
    const token = localStorage.getItem("auth");

    if (image) {
      formData.append("avatar", image);
    }

    try {
      console.log(token);

      const response = await axios.post(
        "http://localhost:5000/api/feed/posts",
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Use correct content type for file uploads
          },
        }
      );

      // Make sure response is in JSON format
      const posts = response.data; // Axios automatically parses JSON, no need for .json()
      console.log(posts);
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
    } catch (error) {
      console.error("Error posting:", error); // Catch any errors and log the
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze-text",
        { message: post ,title: "Post" },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.isCriticalMessage) {
        setIsOptionsDialogOpen(true);

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={user.avatar.url} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: "#3E8EDE",
            backgroundColor: "#e0f2f1",
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    <OptionsDialog open={isOptionsDialogOpen} onClose={handleCloseDialog} content ={"post"} />  

    </WidgetWrapper>
  );
};

export default MyPostWidget;
