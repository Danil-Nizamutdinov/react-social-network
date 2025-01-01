import { apiUrlStatic } from "@src/api";
import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  video: string;
}

const Player: React.FC<PlayerProps> = ({ video }) => {
  return (
    <div>
      <ReactPlayer
        url={apiUrlStatic + video}
        playing={false}
        controls={true}
        width="100%"
        height="210px"
      />
    </div>
  );
};

export default Player;
