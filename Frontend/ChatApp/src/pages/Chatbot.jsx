import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import MindWellAppLayout from "../components/Layout/MindWellApplayout";
import { useSelector } from "react-redux";

const formatTextToLines = (text, wordsPerLine = 7) => {
  const words = text.split(" ");
  let lines = [];
  for (let i = 0; i < words.length; i += wordsPerLine) {
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  }
  return lines.join("\n");
};

const Root = styled("div")(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#f7f7f7",
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  transition: "none",  // Disable any transition
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  height: "500px",
  width: "100%",
  maxWidth: "600px",
  minWidth: "400px",
  overflowY: "auto",
  marginBottom: "20px",
  padding: "10px",
  backgroundColor: "#2d2d2d",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  color: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  transition: "none",  // Disable any transition
}));


const InputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  marginTop: "10px",
});

const Input = styled(TextField)({
  flexGrow: 1,
  marginRight: "10px",
  "& .MuiInputBase-root": {
    color: "#000000", // Input text color black
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#4CAF50",
    },
    "&:hover fieldset": {
      borderColor: "#66BB6A",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#81C784",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#000000", // Label color updated to be more visible
  },
});

const UserMessage = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-end",
  textAlign: "right",
  display: "flex",
  alignItems: "flex-end",
  marginBottom: "10px",
}));

const BotMessage = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start",
  textAlign: "left",
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "10px",
}));

const MessageText = styled(ListItemText)(({ theme }) => ({
  maxWidth: "70%",
  backgroundColor: "#4CAF50", // User message background
  borderRadius: "15px",
  padding: "10px",
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  color: "#ffffff", // User message text color
  boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)", // Shadow effect
}));

const BotMessageText = styled(MessageText)({
  backgroundColor: "#FFC107", // Bot message background
  color: "#000000", // Bot message text color
});

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [introText, setIntroText] = useState("");

  useEffect(() => {
    const text =
      "Welcome to MindWell Chatbot. Here you can get mental health support and guidance. " +
      "Our goal is to provide you with the resources and assistance you need to maintain and improve your mental well-being. " +
      "Feel free to ask any questions about mental health, mindfulness practices, or ways to cope with stress and anxiety. " +
      "We are here to help you navigate through your mental health journey with compassionate support and evidence-based information.";
    
    setIntroText(text);  // Set full text immediately
  
  }, []);

  const {user } = useSelector((state) => state.auth);
  

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = {
        sender: "user",
        text: input,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");

      try {
        const token = localStorage.getItem("auth");
        const response = await axios.post(
          "http://localhost:5000/api/chatbot",
          { message: input },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const formattedReply = formatTextToLines(response.data.reply);
        const botMessage = {
          sender: "bot",
          text: formattedReply,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message to chatbot:", error);
        const errorMessage = {
          sender: "bot",
          text: "Sorry, there was a problem processing your request. Please try again later.",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <MindWellAppLayout>
      <Root>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <Box
              sx={{
                margin: "25px 0 0 0",
                color: "#f5f5f5", // Lighter text color for contrast
                padding: "20px",
                backgroundColor: "#2c2c2c",
                borderRadius: "10px",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Shadow effect for depth
              }}
            >
              <Typography variant="h5" gutterBottom>
                About MindWell Chatbot
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {introText}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Container maxWidth="sm">
              <Box my={4} textAlign="center">
                <ChatContainer>
                  <List>
                    {messages.map((msg, index) =>
                      msg.sender === "user" ? (
                        <UserMessage key={index}>
                          <MessageText
                            primary={msg.text}
                            secondary={new Date(msg.timestamp).toLocaleTimeString()}
                          />
                          <Avatar sx={{ bgcolor: "#4CAF50" }} src={user.avatar.url}>U</Avatar>
                        </UserMessage>
                      ) : (
                        <BotMessage key={index}>
                          <Avatar sx={{ bgcolor: "#FFC107" }}>B</Avatar>
                          <BotMessageText
                            primary={msg.text}
                            secondary={new Date(msg.timestamp).toLocaleTimeString()}
                          />
                        </BotMessage>
                      )
                    )}
                  </List>
                </ChatContainer>
                <InputContainer>
                  <Input
                    variant="outlined"
                    label="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    InputLabelProps={{
                      style: { color: "#000" },
                    }} // Improved label color for better visibility
                  />
                  <Button
                    variant="contained"
                    onClick={sendMessage}
                    sx={{
                      backgroundColor: "#4CAF50",
                      color: "#ffffff",
                      "&:hover": { backgroundColor: "#388E3C" },
                    }}
                  >
                    Send
                  </Button>
                </InputContainer>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Root>
    </MindWellAppLayout>
  );
};

export default Chatbot;
