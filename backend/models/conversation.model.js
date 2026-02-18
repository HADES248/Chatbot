import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ["user", "bot"]
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
})

const conversationSchema = new mongoose.Schema({
  messages: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;