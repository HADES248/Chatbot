import { GoogleGenAI } from "@google/genai";
import conversationModel from "../models/conversation.model.js";

export async function geminiMessage(req, res) {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });
    const { text, conversationId } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: text,
    });

    let conversation;

    conversation = await conversationModel.findById(conversationId);
    console.log("Conversation found:", conversation);

    if (!conversation) {
      conversation = await conversationModel.create({
        messages: [
          { sender: "user", text },
          { sender: "bot", text: response.text }
        ]
      });
    } else {
      conversation.messages.push(
        { sender: "user", text },
        { sender: "bot", text: response.text }
      );
      await conversation.save();
    }

    return res.status(200).json({
      conversationId: conversation._id,
      userMessage: text,
      botMessage: response.text
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: "Gemini failed" });
  }
}
