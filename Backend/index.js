import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js';
import userRoutes from './Routes/usersRoute.js';
import adminRoutes from './Routes/adminRoute.js';
import doctorFeedbackRoute from './Routes/doctorFeedbackRoute.js';
import bot from './Routes/bot.js';
import feedback from './Routes/feedbackRoute.js';
import moodRoutes from './Routes/moodManagementRoute.js';
import analyzeText from './Routes/analyzeTextRoute.js';
import displayFeedback from './Routes/adminRoute.js';
import { v4 as uuid } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
import chat from './Routes/chatRoute.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_TYPING, STOP_TYPING, CHAT_JOINED, CHAT_LEAVED, ONLINE_USERS } from './Constants/event.js';
import { Message } from './Models/MessageSchema.js';
import postRoute from './Routes/postRoute.js';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import bookingRoute from './Routes/BookingRoute.js'
import sendSMS from './Routes/sendMessageRoute.js';
// Import Hugging Face pipeline
import { HfInference } from '@huggingface/inference';
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
const app = express();
app.use(express.json());

// import toxicity from '@tensorflow-models/toxicity'


// // Load the toxicity model
// const threshold = 0.1;
// let model;

// toxicity.load(threshold).then((loadedModel) => {
//   model = loadedModel;
// });



// // API endpoint to analyze text
// app.post('/analyze', async (req, res) => {
//   const {text} = req.body
//   if (!model) {
//     return res.status(500).send('Model not loaded');
//   }

//   // Use the model to classify the input text
//   const predictions = await model.classify([text]);
  
//   // Check the output for toxicity or suicide ideation labels (modify for your use case)
//   const suicideKeywords = ["suicide", "kill myself", "end my life", "no way out"];
//   const containsSuicidalThoughts = suicideKeywords.some(keyword => text.includes(keyword));

//   res.json({ predictions, containsSuicidalThoughts });
// });


const analyzeMessage = async (messageContent) => {
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english', // Replace with a more appropriate model
      inputs: messageContent,
    });

    // Example: You can add additional checks for specific keywords
    const containsSuicidalKeywords = messageContent.match(/(?:suicide|kill|hurt|can't take it|depressed)/i);

    // Assuming the model gives labels as "positive", "negative", or other categories
    const isNegative = result[0].label === 'NEGATIVE' && result[0].score > 0.9; // Adjust the score threshold
    return isNegative || containsSuicidalKeywords; // Return true if either condition is met
  } catch (error) {
    console.error('Error during sentiment analysis:', error);
    throw error; // Rethrow the error for handling it later
  }
};

dotenv.config();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});
app.set('io', io);

const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.set('strictQuery', false);

mongoose.connect(process.env.Mongo_URL)
  .then(() => console.log('Connected to the database!'))
  .catch(err => {
    console.error('Failed to connect to the database!', err.message);
    process.exit(1);
  });

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_API_Key,
  api_secret: process.env.Cloud_API_Secret,
});

app.use('/api', displayFeedback);
app.use('/api',postRoute);
app.use('/api/v1/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.use(bot);
app.use(feedback);
app.use('/api', chat);
app.use('/api', doctorFeedbackRoute);
app.use('/api', moodRoutes);
app.use('/api', analyzeText);
app.use('/api',bookingRoute)
app.use('/api',sendSMS)

// Socket.IO logic
const onlineUsers = new Set();
const userSocketIDs = new Map();

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res || {}, async (err) => {
    await socketAuthenticator(err, socket, next);
  });
});

io.on('connection', (socket) => {
  const user = socket.user;
  console.log('User connected:', user.id);
  userSocketIDs.set(user.id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
    const messageForRealTime = {
      content: message,
      _id: uuid(),
      sender: {
        _id: user.id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user.id,
      chat: chatId,
    };

    try {
      await Message.create(messageForDB);
      console.log('Message saved to the database:', messageForDB);

      // Check if the message contains suicidal or depressive thoughts
      // const isCriticalMessage = await analyzeMessage(message);
      // console.log('Is critical message:', isCriticalMessage);
      // if (isCriticalMessage) {
      //   console.log('Alert: Suicidal or depressive thoughts detected in message:', message);
      // //   // Trigger an alert or notify an admin
      // //   // You can send an alert to admins or save it to the database
      //  } 

      // Emit the message to all members of the chat
      const membersSocket = getSockets(members).filter(socketId => socketId !== undefined);
      membersSocket.forEach((socketId) => {
        io.to(socketId).emit(NEW_MESSAGE, { chatId, message: messageForRealTime });
        io.to(socketId).emit(NEW_MESSAGE_ALERT, { chatId });
      });
    } catch (error) {
      console.error('Error saving message to the database:', error);
    }
  });

  socket.on(START_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(START_TYPING, { chatId });
  });

  socket.on(STOP_TYPING, ({ members, chatId }) => {
    const membersSockets = getSockets(members);
    socket.to(membersSockets).emit(STOP_TYPING, { chatId });
  });

  socket.on(CHAT_JOINED, ({ userId, members }) => {
    onlineUsers.add(userId.toString());
    userSocketIDs.set(userId.toString(), socket.id);

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on(CHAT_LEAVED, ({ userId, members }) => {
    onlineUsers.delete(userId.toString());
    userSocketIDs.delete(userId.toString());

    const membersSocket = getSockets(members);
    io.to(membersSocket).emit(ONLINE_USERS, Array.from(onlineUsers));
  });

  socket.on('disconnect', () => {
    userSocketIDs.delete(user.id.toString());
    onlineUsers.delete(user.id.toString());
    socket.broadcast.emit(ONLINE_USERS, Array.from(onlineUsers));
  });
});

// Helper function to get socket IDs of members
export const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  return sockets;
};

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Socket authenticator function
async function socketAuthenticator(err, socket, next) {
  if (err) {
    return next(new Error('Authentication error'));
  }

  const token = socket.handshake.auth.token?.split(' ')[1];
  if (!token) {
    return next(new Error('Authentication token missing'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_key);
    socket.user = decoded;
    return next();
  } catch (error) {
    return next(new Error('Invalid authentication token'));
  }
}

export { userSocketIDs };
