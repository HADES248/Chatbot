import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
})


// Defining routes
app.use('/bot/v1', chatbotRoutes);
app.use('/api/v1', chatbotRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
