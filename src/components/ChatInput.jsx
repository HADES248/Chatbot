import { useState } from "react";
import dayjs from "dayjs";
//import { Chatbot } from 'supersimpledev'
import axios from 'axios';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages, addConversation, setConversationId, conversationId }) {
  const [inputText, setInputText] = useState('')
  const [loading, setLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    setInputText('');
    setLoading(true);

    // Storing in a variable and then passing it to setChatMessages to make sure the value is updated.
    const newChatMessage = [
      ...chatMessages,
      {
        text: inputText,
        sender: 'user',
        _id: crypto.randomUUID(),
        time: dayjs().valueOf()
      },
      {
        text: <img src={LoadingSpinner} height="28px" margin="-15px" />,
        sender: 'bot',
        _id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages(newChatMessage);

    // Using external library (which as chatbot setup code) and getting a response
    //const response = await Chatbot.getResponseAsync(inputText);

    // Using My Code
    // const response = await axios.post("http://localhost:4002/bot/v1/message", {
    //   text: inputText,
    // });

    try {
      // Using gemini API
      const geminiResponse = await axios.post("http://localhost:4002/api/v1/gemini", {
        text: inputText,
        conversationId
      });
      setChatMessages([
        ...newChatMessage.slice(0, -1),
        {
          text: geminiResponse ? geminiResponse.data.botMessage : 'Loading',
          sender: 'bot',
          _id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ])
      if (!conversationId) {
        setConversationId(geminiResponse.data.conversationId);
        addConversation({
          _id: geminiResponse.data.conversationId,
          title: inputText,
          messages: newChatMessage
        })
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
    if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    // this is called a fragment (empty <></>)
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        // value changes the text inside the input (called controlled input)
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={loading || inputText === ''}
        className="send-button">
        Send
      </button>
    </div>
  )
}