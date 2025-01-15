import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import MessageSend from "./MessageSend";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@src/hooks/redux";
import HeaderMessage from "../Header/HeaderMessage";
import useWindowWidth, { mobile } from "@src/hooks/useWindowWidth";

const socket = io("http://localhost:3000", {
  autoConnect: false,
});

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any>([]);
  const { user, isAuth } = useAppSelector((state) => state.userSlice);
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

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

  const scrollDown = () => {
    endOfMessagesRef.current.scroll(
      0,
      endOfMessagesRef.current.scrollHeight -
        endOfMessagesRef.current.clientHeight
    );
  };

  useEffect(() => {
    scrollDown();
  }, [messages]);

  const isDesctop = mobile < useWindowWidth();

  return (
    <>
      <div className="message_wrapper">
        {isDesctop && (
          <div className="header_wrapper">
            <header className="header header_message">
              <HeaderMessage />
            </header>
          </div>
        )}

        <div className="container messages_list" ref={endOfMessagesRef}>
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
        {isAuth ? <MessageSend socket={socket} id={id} userId={user.id} /> : ""}
      </div>
    </>
  );
};

export default Chat;
