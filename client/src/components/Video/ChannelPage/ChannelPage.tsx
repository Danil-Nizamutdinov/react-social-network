import React, { useEffect } from "react";
import Channel from "./Channel";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { getChannel } from "@src/store/reducers/ActionCreators/ChannelAC";

const ChannelPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(getChannel(Number(id)));
  }, [id]);

  return (
    <section className="channel_page">
      {currentChannel ? (
        <>
          <Channel />
          <div>
            <Outlet />
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ChannelPage;
