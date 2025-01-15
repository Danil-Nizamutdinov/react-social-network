import React, { useEffect } from "react";
import VideoList from "../VideoList/VideoList";
import Player from "./Player";
import VideoComments from "./VideoComments";
import VideoInfo from "./VideoInfo";
import VideoChannel from "./VideoChannel";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { useParams } from "react-router-dom";
import { getVideo } from "@src/store/reducers/ActionCreators/VideoAC";

export interface VideoProps {
  currentVideo: any;
}

const Video: React.FC = () => {
  const currentVideo = useAppSelector((state) => state.videoSlice.currentVideo);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  // const handleClick = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };

  useEffect(() => {
    dispatch(getVideo(Number(id)));
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <section>
      {currentVideo ? (
        <div className="video">
          <Player video={currentVideo.video} />
          <div className="video_wrapper">
            <VideoInfo currentVideo={currentVideo} />
            <VideoChannel currentVideo={currentVideo} />
            <VideoComments />
          </div>
        </div>
      ) : (
        ""
      )}
      <VideoList />
    </section>
  );
};

export default Video;
