import React, { useCallback, useEffect, useRef, useState } from "react";
import AppLayout from "../../components/Layout/AppLayout";
import { Stack,IconButton, Skeleton, Box, Typography, Alert } from "@mui/material";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../../components/styles/StyledComponent";
import FileMenu from "../../components/dialogs/FileMenu";
import { sampleMessage } from "../../Constants/sampleData";
import MessageComponent from "../../components/shared/MessageComponent";
import { useSocket } from "../../socket";
import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../../Constants/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../../Redux/api";
import { useErrors, useSocketEvents } from "../../hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInfiniteScrollTop } from "6pp";
import { setIsFileMenu } from "../../Redux/reducers/misc";
import { removeNewMessagesAlert } from "../../Redux/reducers/chat";
import axios from "axios";
import {toast} from "react-hot-toast";



// Function to show a custom toast
const showCustomToast = () => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex items-center justify-between bg-gradient-to-r from-red-500 to-red-700 text-white p-4 rounded-lg shadow-lg transition-all duration-300`}
    >
      <div className="flex items-center">
        <span className="mr-2 text-lg font-semibold">🚨 Critical Alert:</span>
        <span>
          We detected potential suicidal or depressive thoughts in your message. 
          Please consider reaching out to a professional or exploring our interactive exercises for support.
        </span>
      </div>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="ml-4 bg-transparent text-white font-bold hover:underline"
      >
        Dismiss
      </button>
    </div>
  ));
};



const Chat = ({chatId}) => {
  const {user} = useSelector((state) => state.auth);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const fileMenuref = useRef(null);
  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId})
 
  const [message, setMessage] = useState("");
  const members = chatDetails?.data?.chat?.members;

  
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [IamTyping, setIamTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const typingTimeout = useRef(null);
   


  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
 
  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];


  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!IamTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setIamTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
      setIamTyping(false);
    }, [2000]);
  };



  const handleFileOpen = (e) => {
  dispatch(setIsFileMenu(true));
   setFileMenuAnchor(e.currentTarget);
  };

   const submitHandler = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Emitting the message to the server
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");


    try {
      const token = localStorage.getItem("auth");
      const response = await axios.post(
        "http://localhost:5000/api/analyze-text",
        {message},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

        }

       
  )
  console.log(response.data)
  if(response.data.isCriticalMessage){
    toast("We detected potential suicidal or depressive thoughts in your message Please consider reaching out to a professional or exploring our interactive exercises for support")
  
  }

  
}

  catch (error) {
    console.error(error);
  }
}
  
  


   

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessagesAlert (chatId));

    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) return navigate("/");
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback(
    (data) => {
      
      if (data.chatId !== chatId) return;
      
      

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );

  const startTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      console.log("user typing", data);

      setUserTyping(true);
    },
    [chatId]
  );

  const stopTypingListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      setUserTyping(false);
    },
    [chatId]
  );

  const alertListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: {
          _id: "djasdhajksdhasdsadasdas",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId]
  );

  const eventHandler = {
    [ALERT]: alertListener,
    [NEW_MESSAGE]: newMessagesListener,
    [START_TYPING]: startTypingListener,
    [STOP_TYPING]: stopTypingListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages, ...messages];
  
  


  return chatDetails.isLoading?<Skeleton/>
  :(
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        backgroundColor={"#f5f5f5"}
        height={"90%"}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        {
          allMessages.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))
        }
        
        {userTyping && (
  <Box
    sx={{
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      gap: '0.5rem',
      padding: '0.5rem',
      
    }}
  >
    <Typography
      sx={{
        fontStyle: 'italic', 
        color: '#555',
      }}
    >
      Someone is typing
    </Typography>
    <Box 
      sx={{
        display: 'flex',
        gap: '4px',
      }}
    >
      <Box 
        sx={{
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#007BFF',
          animation: 'bounce 1s infinite alternate',
          '@keyframes bounce': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(-8px)' }
          }
        }} 
      />
      <Box 
        sx={{
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#007BFF',
          animation: 'bounce 1s infinite alternate 0.2s',
          '@keyframes bounce': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(-8px)' }
          }
        }} 
      />
      <Box 
        sx={{
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          backgroundColor: '#007BFF',
          animation: 'bounce 1s infinite alternate 0.4s',
          '@keyframes bounce': {
            from: { transform: 'translateY(0)' },
            to: { transform: 'translateY(-8px)' }
          }
        }} 
      />
    </Box>
  </Box>
)}

<div ref={bottomRef}>
   
</div>
      
      </Stack>

      <form
        style={{
          height: "10%",
        }}
        name="messagefield"
      >
        <Stack direction={"row"} height={"100%"} padding={"0.5rem"} spacing={"0.5rem"} alignItems={"center"
        } position={"relative"}>

          <IconButton
            sx={{
              backgroundColor: "#72A0C1",
              color: "#fff",
              padding: "0.5rem",
              "&:hover": {
                backgroundColor: "#002D62",
              },
              
            }}
            
          onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox 
          placeholder="Type a message"
          value={message}
          onChange={messageOnChange}
          ></InputBox>

          <IconButton type="submit" onClick={submitHandler} sx={{
            backgroundColor:'#72A0C1',
            color:'#fff',
            marginLeft:'auto',
            rotate:'-30deg',
            padding:'0.5rem',
            "&:hover":{
              backgroundColor:'#002D62',
              
            }
          }}>
            <SendIcon />
          </IconButton>

        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout()(Chat);
