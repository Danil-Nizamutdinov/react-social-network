import React from "react";
import Absence from "@src/components/Helper/Absence";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import Plus from "./Plus";
import { toggle } from "@src/store/reducers/toggleSlice";
import { ActiveToggle } from "@src/types/main";

const ChannelAbout: React.FC = () => {
  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );

  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();

  return (
    <section className="container">
      {currentChannel.description ? (
        <>
          <div className="about">{currentChannel.description}</div>
          {currentChannel.user.id === user?.id ? (
            <button
              className="button_blue about_button"
              onClick={() => dispatch(toggle(ActiveToggle.DESCRIPTION))}
            >
              Редактировать
            </button>
          ) : (
            ""
          )}
        </>
      ) : (
        <>
          <Absence />
          {currentChannel.user.id === user?.id ? (
            <Plus toggle={() => toggle(ActiveToggle.DESCRIPTION)} />
          ) : (
            ""
          )}
        </>
      )}
    </section>
  );
};

export default ChannelAbout;
