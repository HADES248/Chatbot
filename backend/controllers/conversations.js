import Conversation from "../models/conversation.model.js";

// Get all conversations
export async function getConversations(req, res) {
  try {
    const conversations = await Conversation.find()
      .sort({ createdAt: -1 });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
}

// Get single conversation
export async function getConversationById(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({ error: "Not found" });
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: "Error fetching conversation" });
  }
}
