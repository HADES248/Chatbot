import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();

const app = express();

// middleware
app.use(cors());

app.use(express.json());

// Connect to MongoDB
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

app.use((req, res, next) => {
  if (!isConnected) {
    connectToMongoDB();
  }
  next();
})

// Defining routes
app.use('/bot/v1', chatbotRoutes);
app.use('/api/v1', chatbotRoutes);

// No use of app.listen() as the serverless function will handle the incoming requests on vercel
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

export default app;