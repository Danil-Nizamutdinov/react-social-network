import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Absence from "../Helper/Absence";
import { getChats } from "@src/store/reducers/ActionCreators/ChatAC";
import { convertToReadableDate } from "../Helper/readableDate";
import { apiUrlStatic } from "@src/api";

const Chats: React.FC = () => {
  const { user, isAuth } = useAppSelector((state) => state.userSlice);
  const chats = useAppSelector((state) => state.chatSlice.chats);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth) {
      dispatch(getChats(user.id));
    }
  }, []);

  return (
    <div className="container">
      {chats?.length === 0 ? (
        <Absence />
      ) : (
        chats?.map((e: any) => (
          <NavLink key={e.id} className="chat_box" to={`/chats/${e.id}`}>
            <div className="chat_box_item">
              <div>
                <img
                  src={apiUrlStatic + e.users[0].avatar}
                  alt="ava"
                  className="ava_contacts"
                />
              </div>
              <div className="chat_info">
                <div className="chat_info_item">{e.users[0].login}</div>
                <div className="chat_info_item">{e.lastMessage}</div>
              </div>
            </div>
            <div className="chat_box">{convertToReadableDate(e.updatedAt)}</div>
          </NavLink>
        ))
      )}
    </div>
  );
};

export default Chats;
