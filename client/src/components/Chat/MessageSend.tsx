import React, { useState } from "react";
import send from "@src/assets/send.png";
import smile from "@src/assets/smile.png";

interface Props {
  socket: any;
  id: any;
  userId: any;
}

const MessageSend: React.FC<Props> = ({ socket, id, userId }) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    socket.emit("sendMessage", { userId, chatId: id, content: message });
    setMessage("");
  };

  return (
    <div className="message_send">
      <div className="message_send_input">
        <input
          type="text"
          className="message_input"
          placeholder="Написать сообщение..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="message_send_img">
        <img src={smile} alt="smile" />
        <img
          src={send}
          alt="send"
          className="send_img"
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default MessageSend;
