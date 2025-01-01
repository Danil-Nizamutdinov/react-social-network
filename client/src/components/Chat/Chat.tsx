import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageSend from "./MessageSend";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@src/hooks/redux";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const { user, isAuth } = useAppSelector((state) => state.userSlice);

  const { id } = useParams();

  useEffect(() => {
    function onMessage(data: any) {
      setMessages(data);
    }

    if (isAuth) {
      socket.connect();
      socket.emit("join", { name: user.login, room: id });
      socket.on("message", onMessage);
      socket.on("getMessages", onMessage);
      return () => {
        socket.off("getMessages");
        socket.disconnect();
      };
    }
  }, []);

  return (
    <>
      <div className="container message_wrapper">
        <div className="messages_list">
          {messages.map((e: any) => (
            <div
              key={e.id}
              className={
                e.userId === user.id
                  ? "message_active message_box"
                  : "message message_box"
              }
            >
              {e.content}
            </div>
          ))}
        </div>
      </div>
      {isAuth ? <MessageSend socket={socket} id={id} userId={user.id} /> : ""}
    </>
  );
};

export default Chat;
