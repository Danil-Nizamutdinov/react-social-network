import React from "react";
import edit from "@assets/edit.png";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { logout } from "@src/store/reducers/ActionCreators/UserAC";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { apiUrlStatic } from "@src/api";
import ChannelApi from "@src/api/ChannelApi";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("video");
    dispatch(toggleFalse());
  };

  const navigateChannel = async () => {
    const res = await ChannelApi.getChannel(null, user.id);
    navigate(`/channel/${res.data.id}/video`);
    dispatch(toggleFalse());
  };

  return (
    <div className="profile" onClick={(e) => e.stopPropagation()}>
      <div className="profile_header">
        <div className="profile_header_info">
          <div>
            <img
              src={apiUrlStatic + user?.avatar}
              alt="ava"
              className="ava_profile"
            />
          </div>
          <div className="profile_header_info_text">
            <div>{user?.login}</div>
            <div className="profile_header_email">da****@mail.ru</div>
          </div>
        </div>
        <div>
          <img src={edit} alt="edit" />
        </div>
      </div>
      <div className="profile_menu">
        <span onClick={navigateChannel}>Мои видео</span>
        <span>Создать канал</span>
        <span>Создать чат</span>
        <span onClick={handleLogout}>Выйти</span>
      </div>
    </div>
  );
};

export default Profile;
