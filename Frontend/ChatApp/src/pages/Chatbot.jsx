import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Paper, List, ListItem, ListItemText, Avatar, Grid } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import logo from "../assets/images/logo.png";

const formatTextToLines = (text, wordsPerLine = 7) => {
    const words = text.split(' ');
    let lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
        lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }
    return lines.join('\n');
};

const Root = styled('div')(({ theme }) => ({
    padding: '20px',
    backgroundColor: '#1a1a1a',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
    height: '500px',
    maxHeight: '600px',
    width: '100%',
    maxWidth: '600px',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#333',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    color: '#fff',
}));

const InputContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
});

const Input = styled(TextField)({
    flexGrow: 1,
    marginRight: '10px',
    '& .MuiInputBase-root': {
        color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#4CAF50',
        },
        '&:hover fieldset': {
            borderColor: '#66BB6A',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#81C784',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#fff',
    },
});

const UserMessage = styled(ListItem)(({ theme }) => ({
    justifyContent: 'flex-end',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'flex-end',
}));

const BotMessage = styled(ListItem)(({ theme }) => ({
    justifyContent: 'flex-start',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'flex-start',
}));

const MessageText = styled(ListItemText)(({ theme }) => ({
    maxWidth: '70%',
    backgroundColor: '#4CAF50',
    borderRadius: '10px',
    padding: '10px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
    color: '#fff',
}));

const BotMessageText = styled(MessageText)({
    backgroundColor: '#FFC107',
    color: '#000',
});

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [introText, setIntroText] = useState('');

    useEffect(() => {
        const text = "Welcome to MindWell Chatbot. Here you can get mental health support and guidance. " +
        "Our goal is to provide you with the resources and assistance you need to maintain and improve your mental well-being. " +
        "Feel free to ask any questions about mental health, mindfulness practices, or ways to cope with stress and anxiety. " +
        "We are here to help you navigate through your mental health journey with compassionate support and evidence-based information."
        let index = 0;

        const intervalId = setInterval(() => {
            setIntroText(text.slice(0, index));
            index++;
            if (index > text.length) {
                clearInterval(intervalId);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, []);

    const sendMessage = async () => {
        if (input.trim()) {
            const userMessage = { sender: 'user', text: input, timestamp: new Date() };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');

            try {
                const response = await axios.post('http://localhost:5000/api/chatbot', { message: input });
                const formattedReply = formatTextToLines(response.data.reply);
                const botMessage = { sender: 'bot', text: formatResponse(formattedReply), timestamp: new Date() };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } catch (error) {
                console.error('Error sending message to chatbot:', error);
            }
        }
    };

    const formatResponse = (response) => {
        return response.replace(/```(.*?)```/gs, (_, code) => `<pre><code>${code}</code></pre>`);
    };

    return (
        <Root>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
                <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: '#1a1a1a',
          }}
        >
          <img src={logo} alt="MindWell" style={{ width: 200, height: 100, }} />
          
        </Box>
  
                  <Box
                  sx={{ margin:"70px 0px 0px 0px", color: 'white', padding: '20px', backgroundColor: '#2c2c2c', borderRadius: '10px', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem:"center" }}>
                    <Typography variant="h5" gutterBottom>
                        About MindWell Chatbot
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {introText}
                    </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Container maxWidth="sm">
                        <Box my={4} textAlign="center">
                            <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50' }}>
                                MindWell Chatbot
                            </Typography>
                            <ChatContainer>
                                <List>
                                    {messages.map((msg, index) => (
                                        msg.sender === 'user' ? (
                                            <UserMessage key={index}>
                                                <MessageText
                                                    primary={msg.text}
                                                    secondary={new Date(msg.timestamp).toLocaleTimeString()}
                                                />
                                                <Avatar sx={{ bgcolor: 'primary.main' }}>U</Avatar>
                                            </UserMessage>
                                        ) : (
                                            <BotMessage key={index}>
                                                <Avatar sx={{ bgcolor: 'secondary.main' }}>B</Avatar>
                                                <BotMessageText
                                                    primary={<span dangerouslySetInnerHTML={{ __html: msg.text }} />}
                                                    secondary={new Date(msg.timestamp).toLocaleTimeString()}
                                                />
                                            </BotMessage>
                                        )
                                    ))}
                                </List>
                            </ChatContainer>
                            <InputContainer>
                                <Input
                                    variant="outlined"
                                    label="Type a message"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            sendMessage();
                                        }
                                    }}
                                />
                                <Button variant="contained" color="primary" onClick={sendMessage}>
                                    Send
                                </Button>
                            </InputContainer>
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </Root>
    );
};

export default Chatbot;
