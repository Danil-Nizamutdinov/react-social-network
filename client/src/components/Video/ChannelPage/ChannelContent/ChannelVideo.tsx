import React from "react";
import Absence from "@src/components/Helper/Absence";
import Plus from "./Plus";
import { useAppSelector } from "@src/hooks/redux";
import { apiUrlStatic } from "@src/api";
import { convertToReadableDate } from "@src/components/Helper/readableDate";
import { NavLink } from "react-router-dom";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";

const ChannelVideo: React.FC = () => {
  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );
  const user = useAppSelector((state) => state.userSlice.user);
  return (
    <section className="video_list container">
      {currentChannel.videos.length === 0 ? (
        <Absence></Absence>
      ) : (
        currentChannel.videos.map((v: any) => (
          <div className="video_item" key={v.id}>
            <NavLink to={`/video/${v.id}`}>
              <img
                src={apiUrlStatic + v.preview}
                alt="preview"
                className="preview"
              />
            </NavLink>
            <div className="video_item_content">
              <img
                src={apiUrlStatic + currentChannel.avatar}
                alt="ava"
                className="ava"
              />

              <div className="video_item_info">
                <div className="video_item_title">{v.title}</div>
                <div className="video_item_subtitle">
                  {currentChannel.name}*{convertToReadableDate(v.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {currentChannel.user.id === user?.id ? (
        <Plus toggle={() => toggle(ActiveToggle.ADD_VIDEO)} />
      ) : (
        ""
      )}
    </section>
  );
};

export default ChannelVideo;
