import axios from "axios";
import "./ChatSidebar.css";
import DeleteIcon from '../assets/delete.png'

const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
}) => {
  async function clearChat(id) {
    await axios.delete(`http://localhost:4002/api/v1/conversations/${id}`)
    window.location.reload();
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={onNewChat}>
          + New Chat
        </button>
      </div>

      <div className="conversation-list">
        {conversations.length === 0 ? (
          <p className="empty-text">No conversations yet</p>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv._id}
              className={`conversation-item ${activeConversationId === conv._id ? "active" : ""
                }`}
              onClick={() => onSelectConversation(conv._id)}
            >
              <span className="conversation-title">
                {conv.title || conv.messages?.[0]?.text.slice(0, 25) || "New Conversation"}
              </span>
              <img className="delete-button" src={DeleteIcon} onClick={() => clearChat(conv._id)} alt="Delete" />
            </div>
          ))
        )}
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">U</div>
          <span>My Account</span>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
