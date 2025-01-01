import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { VideoProps } from "./Video";
import { apiUrlStatic } from "@src/api";
import {
  getReaction,
  getVideo,
} from "@src/store/reducers/ActionCreators/VideoAC";
import { subscribe } from "@src/store/reducers/ActionCreators/ChannelAC";

const VideoChannel: React.FC<VideoProps> = ({ currentVideo }) => {
  const user = useAppSelector((state) => state.userSlice.user);
  const isSubscribe = useAppSelector((state) => state.channelSlice.isSubscribe);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const handleSubscribe = async () => {
    if (!user) return alert("войдите в аккаунт");
    await dispatch(
      subscribe({ type: "channel", channelId: currentVideo.channelId })
    );
    await dispatch(getVideo(Number(id)));
  };
  useEffect(() => {
    if (user) {
      dispatch(
        getReaction({ type: "channel", contentId: currentVideo.channelId })
      );
    }
  }, [id]);

  return (
    <div className="video_content video_chanell">
      <div className="video_chanell_left">
        <NavLink to={`/channel/${currentVideo.channel.id}/video`}>
          <img
            src={apiUrlStatic + currentVideo.channel.avatar}
            alt="ava"
            className="ava"
          />
        </NavLink>
        <div className="video_chanell_info">
          <div className="video_chanell_name">{currentVideo.channel.name}</div>
          <div className="video_chanell_subscribers">
            {currentVideo.channel.subscribers} подписчиков
          </div>
        </div>
      </div>
      <div className="video_chanell_button">
        <button className="button_blue" onClick={handleSubscribe}>
          {isSubscribe ? "Вы подписаны" : "Подписаться"}
        </button>
      </div>
    </div>
  );
};

export default VideoChannel;
