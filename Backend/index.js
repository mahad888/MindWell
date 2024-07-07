
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './Routes/auth.js';
import user from './Routes/usersRoute.js';
import bot from './Routes/bot.js';
import feedback from './Routes/feedbackRoute.js';
dotenv.config();

const app = express();

const port = process.env.PORT || 8000;

const corsOptions = {
    origin: true,
    credentials: true,
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


mongoose.set('strictQuery', false);

mongoose.connect(process.env.Mongo_URL).then(() => { 
    console.log('Connected to the database!');
}).catch((err) => {
    console.log('Failed to connect to the database!');
    console.log(err);
});


app.use('/api/v1/auth',authRoutes)
app.use(user)
app.use(bot)
app.use(feedback)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});