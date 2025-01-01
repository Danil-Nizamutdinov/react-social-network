import React from "react";
import { NavLink } from "react-router-dom";
import message from "@assets/message.png";
import video from "@assets/video.png";
import musical from "@assets/musical-note.png";
import chat from "@assets/chat-room.png";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";

const HeaderMenu: React.FC = () => {
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(toggleFalse());
  };

  return (
    <div className="header_menu" onClick={(e) => e.stopPropagation()}>
      <nav className="nav">
        <NavLink to="chats" className="nav_link" onClick={close}>
          <span className="nav_content">
            <img src={message} alt="message" className="nav_icon" />
            Сообщения
          </span>
        </NavLink>

        <NavLink to="video" className="nav_link" onClick={close}>
          <span className="nav_content">
            <img src={video} alt="video" className="nav_icon" />
            Видео
          </span>
        </NavLink>

        <NavLink to="" className="nav_link" onClick={close}>
          <span className="nav_content">
            <img src={musical} alt="musical" className="nav_icon" />
            Музыка
          </span>
        </NavLink>

        <NavLink to="" className="nav_link" onClick={close}>
          <span className="nav_content">
            <img src={chat} alt="chat" className="nav_icon" />
            Каналы
          </span>
        </NavLink>
      </nav>
    </div>
  );
};

export default HeaderMenu;
