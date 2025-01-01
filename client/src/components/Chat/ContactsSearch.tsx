import { apiUrlStatic } from "@src/api";
import chatApi from "@src/api/ChatApi";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { getUsers } from "@src/store/reducers/ActionCreators/ChatAC";
import { User } from "@src/types/main";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ContactsSearch: React.FC = () => {
  const contacts = useAppSelector((state) => state.chatSlice.searchContacts);
  const user = useAppSelector((state) => state.userSlice.user);
  const { login } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const crChat = async (id: any) => {
    try {
      const res = await chatApi.createChat(user.id, id);
      navigate(`/chats/${res.data.id}`);
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      navigate(`/chats`);
    }
  };

  useEffect(() => {
    dispatch(getUsers(login));
  }, [login]);

  return (
    <div className="container">
      {contacts?.map((e: User) => (
        <div className="contact_content" key={e.id}>
          <div className="contact">
            <img
              src={apiUrlStatic + e.avatar}
              alt="ava"
              className="ava_contacts"
            />
            <div className="contact_login">{e.login}</div>
          </div>
          <div>
            <button className="button_blue" onClick={() => crChat(e.id)}>
              Начать беседу
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactsSearch;
