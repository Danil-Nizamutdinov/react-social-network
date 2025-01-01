import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import React, { useEffect, useState } from "react";
import expandArrow from "@src/assets/expand-arrow.png";
import like from "@src/assets/like.png";
import dislike from "@src/assets/dislike.png";
import likeActive from "@src/assets/like-active.png";
import dislikeActive from "@src/assets/dislike-active.png";
import arrow from "@src/assets/arrow.png";
import { VideoProps } from "./Video";
import { convertToReadableDate } from "@src/components/Helper/readableDate";
import { useParams } from "react-router-dom";
import {
  addReaction,
  getReaction,
  getVideo,
} from "@src/store/reducers/ActionCreators/VideoAC";

const VideoInfo: React.FC<VideoProps> = ({ currentVideo }) => {
  const [isUpDown, setIsUpDown] = useState<boolean>(false);
  const emotion = useAppSelector((state) => state.videoSlice.emotion);

  const user = useAppSelector((state) => state.userSlice.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const handleAddReaction = async (emotion: number) => {
    if (!user) return alert("авторизуйтесь что бы оценить видео");
    await dispatch(
      addReaction({ type: "video", emotion, contentId: currentVideo.id })
    );
    await dispatch(getVideo(currentVideo.id));
  };

  useEffect(() => {
    if (user) {
      dispatch(getReaction({ type: "video", contentId: currentVideo.id }));
    }
  }, [id]);

  return (
    <div className="video_content">
      <div className="video_title">
        {currentVideo.title}{" "}
        <img src={expandArrow} onClick={() => setIsUpDown(!isUpDown)} />
      </div>
      <div className="video_subtitle">
        {convertToReadableDate(currentVideo.createdAt)}
      </div>
      <div className="video_action">
        <div>
          {emotion === "like" ? (
            <img
              src={likeActive}
              alt="like"
              className="like"
              onClick={() => handleAddReaction(1)}
            />
          ) : (
            <img
              src={like}
              alt="like"
              className="like"
              onClick={() => handleAddReaction(1)}
            />
          )}
          <span className="video_action_text">{currentVideo.like}</span>
        </div>
        <div>
          {emotion === "dislike" ? (
            <img
              src={dislikeActive}
              alt="dislike"
              className="dislike"
              onClick={() => handleAddReaction(0)}
            />
          ) : (
            <img
              src={dislike}
              alt="dislike"
              className="dislike"
              onClick={() => handleAddReaction(0)}
            />
          )}
          <span className="video_action_text">{currentVideo.dislike}</span>
        </div>
        <div>
          <img src={arrow} alt="arrow" className="arrow" />
          <span className="video_action_text">Поделиться</span>
        </div>
      </div>
      <div className={`up_down ${isUpDown ? "up_down_active" : ""}`}>
        {currentVideo.description}
      </div>
    </div>
  );
};

export default VideoInfo;
