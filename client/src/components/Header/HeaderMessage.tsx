import React, { useEffect } from "react";
import arrow from "@src/assets/left-arrow.png";
import trash from "@src/assets/trash.png";
import { useNavigate, useParams } from "react-router-dom";
import chatApi from "@src/api/ChatApi";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { getChat } from "@src/store/reducers/ActionCreators/ChatAC";
import { apiUrlStatic } from "@src/api";

const HeaderMessage: React.FC = () => {
  const chat = useAppSelector((state) => state.chatSlice.chat);
  const { user, isAuth } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  const delChat = async () => {
    await chatApi.deleteChat(Number(id));
    navigate("/chats");
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(getChat({ chatId: Number(id), userId: user.id }));
    }
  }, []);

  return (
    <>
      <img
        src={arrow}
        alt="arrow"
        className="cursor_pointer"
        onClick={() => navigate(-1)}
      />
      <div className="header_content">
        <img
          src={apiUrlStatic + chat?.avatar}
          alt="ava"
          className="ava_contacts"
        />
        <div className="header_content_last_item">{chat?.login}</div>
      </div>
      <div className="header_message_delete cursor_pointer" onClick={delChat}>
        <img src={trash} />
        <div className="header_message_delete_text">Удалить чат</div>
      </div>
    </>
  );
};

export default HeaderMessage;
