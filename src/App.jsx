// Best practice is to use import external libraries from node_modules and not script tag
import { useEffect, useState } from 'react'
//import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput' // Named Export (with brackets)
import ChatMessages from './components/ChatMessages'; // Default export (without brackets)
import './App.css'
// vite lets us import any type of file (css or img)

function App() {

  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

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
    <div className="app-container">
      {chatMessages.length === 0 &&
        <p className="welcome-message">Welcome to my Project</p>
      }
      <ChatMessages
        chatMessages={chatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
