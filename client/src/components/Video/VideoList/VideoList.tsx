import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
import { getVideos } from "@src/store/reducers/ActionCreators/VideoAC";
import { apiUrlStatic } from "@src/api";
import { convertToReadableDate } from "@src/components/Helper/readableDate";
import useWindowHeight from "@src/hooks/useWindowHeight";

const VideoList: React.FC = () => {
  const video = useAppSelector((state) => state.videoSlice.video);
  const page = useAppSelector((state) => state.videoSlice.page);
  const totalPages = useAppSelector((state) => state.videoSlice.totalPages);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVideos(1));
  }, []);

  useWindowHeight(page, totalPages);

  return (
    <section className="video_list container">
      {video.map((v: any) => (
        <div className="video_item" key={v.id}>
          <NavLink to={`/video/${v.id}`}>
            <img
              src={apiUrlStatic + v.preview}
              alt="preview"
              className="preview"
            />
          </NavLink>
          <div className="video_item_content">
            <NavLink to={`/channel/${v.channel.id}/video`}>
              <img
                src={apiUrlStatic + v.channel.avatar}
                alt="ava"
                className="ava"
              />
            </NavLink>
            <div className="video_item_info">
              <div className="video_item_title">{v.title}</div>
              <div className="video_item_subtitle">
                {v.channel.name}*{convertToReadableDate(v.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VideoList;
