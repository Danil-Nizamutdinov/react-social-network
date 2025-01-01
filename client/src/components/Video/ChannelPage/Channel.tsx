import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { apiUrlStatic } from "@src/api";
import { toggle } from "@src/store/reducers/toggleSlice";
import { getReaction } from "@src/store/reducers/ActionCreators/VideoAC";
import { subscribe } from "@src/store/reducers/ActionCreators/ChannelAC";
import { ActiveToggle } from "@src/types/main";

const Channel: React.FC = () => {
  const isSubscribe = useAppSelector((state) => state.channelSlice.isSubscribe);
  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleSubscribe = async () => {
    if (!user) return alert("что бы подписаться войдите в аккаунт");
    dispatch(subscribe({ type: "channel", channelId: currentChannel.id }));
  };

  useEffect(() => {
    if (user) {
      dispatch(getReaction({ type: "channel", contentId: currentChannel.id }));
    }
  }, [id]);

  return (
    <div className="channel">
      <div className="channel_background_img">
        <img src={apiUrlStatic + currentChannel.background} alt="background" />
      </div>
      <div className="channel_box">
        <div className="channel_info">
          <div className="channel_info_item">
            <img
              src={apiUrlStatic + currentChannel.avatar}
              alt="ava"
              className="ava_profile"
            />
            <div className="channel_name">{currentChannel.name}</div>
          </div>
          {currentChannel.user.id === user?.id ? (
            <button
              className="button_blue"
              onClick={() => dispatch(toggle(ActiveToggle.BACKGROUND))}
            >
              Изменить фон
            </button>
          ) : (
            <button className="button_blue" onClick={handleSubscribe}>
              {isSubscribe ? "Вы подписаны" : "Подписаться"}
            </button>
          )}
        </div>
        <nav className="channel_nav_bar">
          <NavLink to="video" className="channel_nav_bar_item">
            Видео
          </NavLink>
          <NavLink to="shorts" className="channel_nav_bar_item">
            Shorts
          </NavLink>
          <NavLink to="about" className="channel_nav_bar_item">
            О канале
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Channel;
