import { apiUrlStatic } from "@src/api";
import useWindowWidth, { mobile } from "@src/hooks/useWindowWidth";
import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  video: string;
}

const Player: React.FC<PlayerProps> = ({ video }) => {
  const windowWidth = useWindowWidth();

  const playerWidth = windowWidth > mobile ? "100%" : "100%";
  const playerHeight = windowWidth > mobile ? "100%" : "100%";

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={apiUrlStatic + video}
        playing={false}
        controls={true}
        width={playerWidth}
        height={playerHeight}
      />
    </div>
  );
};

export default Player;
