// Best practice is to use import external libraries from node_modules and not script tag
import { useEffect, useState } from 'react'
//import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput' // Named Export (with brackets)
import ChatMessages from './components/ChatMessages'; // Default export (without brackets)
import './App.css'
import ChatSidebar from './components/ChatSidebar';
import axios from 'axios';
// vite lets us import any type of file (css or img)

function App() {
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    fetchConversations();
  }, [chatMessages]);

  const fetchConversations = async () => {
    const res = await axios.get(
      "http://localhost:4002/api/v1/conversations"
    );
    setConversations(res.data);
  };

  const loadConversation = async (id) => {
    const res = await axios.get(
      `http://localhost:4002/api/v1/conversations/${id}`
    );

    setConversationId(id);
    setChatMessages(res.data.messages);
  };

  const startNewChat = () => {
    setConversationId(null);
    setChatMessages([]);
  };

  // useEffect(() => {
  //   Chatbot.addResponses({
  //     "yo": "yo what up?",
  //     "you know who i am?": "Yes, You are Kunigami (the WildCard!)"
  //   })
  // }, [])

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  }, [chatMessages])

  return (
    <div className="app-layout">
      <ChatSidebar
        conversations={conversations}
        activeConversationId={conversationId}
        onSelectConversation={loadConversation}
        onNewChat={startNewChat}
      />

      <div className="app-container">
        {chatMessages.length === 0 && (
          <p className="welcome-message">Welcome to my Project</p>
        )}

        <ChatMessages chatMessages={chatMessages} />

        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </div>
  );
}

export default App
