import axios from "axios";
import "./ChatSidebar.css";
import DeleteIcon from "../assets/delete.png";

const ChatSidebar = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  open,
  setOpen,
}) => {
  async function clearChat(id, e) {
    e.stopPropagation(); // prevent selecting conversation
    await axios.delete(`/api/v1/conversations/${id}`);
    window.location.reload();
  }

  return (
    <>
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Overlay for mobile */}
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

      <div className={`sidebar ${open ? "open" : ""}`}>
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
                  {conv.title ||
                    conv.messages?.[0]?.text.slice(0, 25) ||
                    "New Conversation"}
                </span>

                <img
                  className="delete-button"
                  src={DeleteIcon}
                  onClick={(e) => clearChat(conv._id, e)}
                  alt="Delete"
                />
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
    </>
  );
};

export default ChatSidebar;