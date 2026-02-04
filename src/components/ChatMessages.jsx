import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'


function ChatMessages({ chatMessages }) {

  // Creating a custom hook (just start a funciton with use)
  function useAutoScroll(dependencies) {
    const chatMessagesRef = useRef(null);

    useEffect(() => {

      const containerElem = chatMessagesRef.current;
      if (containerElem) containerElem.scrollTop = containerElem.scrollHeight;

    }, [dependencies])

    return chatMessagesRef;

  }

  // using custom hook by passing dependency array and storing the return Ref
  const chatMessagesRef = useAutoScroll(chatMessages);

  /*
    Hooks - Let us insert react features into our components
    useRef lets us save an HTML element from a component
    ref is a container with special react features
    const chatMessagesRef = React.useRef(null);

    useEffect let us run code when a component in created or updated
    React.useEffect(() => {

    can only access this once it is created (hence inside useEffect)
    const containerElem = chatMessagesRef.current;
    if (containerElem) containerElem.scrollTop = containerElem.scrollHeight;

    }, [chatMessages])
    [] controls when this function runs (now runs when chatMessages is updated) known as Dependency Array
    short cut
    const [chatMessages, setChatMessages] = array;
    const chatMessages = array[0]; // save the current data;
    const setChatMessages = array[1]; // function to update the data
  */

  /*
  Don't run this function only pass it as otherwise it will result in undefined.
  function sendMessage() {

    setChatMessages([
      ...chatMessages,
      {
        message: 'test',
        sender: 'user',
        id: crypto.randomUUID()
      }
    ])
     this does not update the state
     chatMessages.push({
       message: 'test',
       sender: 'user',
       id: crypto.randomUUID()
    })
    console.log(chatMessages);
  }
  */
  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}>
      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              time={chatMessage.time}
              key={chatMessage.id}
            />
          )
        })
      }
    </div>
  );
}

export default ChatMessages