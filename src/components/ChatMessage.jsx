import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user-1.webp'
import dayjs from 'dayjs'
import './ChatMessage.css';

export function ChatMessage({ message, sender, timestamp }) {
  // const message = props.message;
  // const sender = props.sender;
  // Destructuring (another way using props)
  //const { message, sender } = props;

  /*
  if (sender === 'robot') {
    return (
      <div>
        <img src="robot.png" width="50" />
        {message}
      </div>
    )
  }
  */
  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'bot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        {message}
        <div className="chat-message-time">
          {dayjs(timestamp).format('h:mma')}
        </div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  )
}