import { useState } from "react";
import dayjs from "dayjs";
//import { Chatbot } from 'supersimpledev'
import axios from 'axios';
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    setInputText('');
    setIsLoading(true);

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

    // Using gemini API
    const geminiResponse = await axios.post("http://localhost:4002/api/v1/gemini", {
      text: inputText,
      conversationId
    });

    if (!conversationId) {
      setConversationId(geminiResponse.data.conversationId);
    }

    setChatMessages([
      ...newChatMessage.slice(0, -1),
      {
        text: geminiResponse ? geminiResponse.data.botMessage : 'Loading',
        sender: 'bot',
        _id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ])
    setIsLoading(false);
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
        disabled={isLoading || inputText === ''}
        className="send-button">
        Send
      </button>
    </div>
  )
}