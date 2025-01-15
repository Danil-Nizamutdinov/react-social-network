import React, { useEffect, useState } from "react";
import cross from "@src/assets/cross.png";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { updateDescription } from "@src/store/reducers/ActionCreators/ChannelAC";

const ChannelDescription: React.FC = () => {
  const [description, setDescription] = useState<string>("");

  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );

  useEffect(() => {
    if (currentChannel?.description) {
      setDescription(currentChannel.description);
    }
  }, [currentChannel]);

  const dispatch = useAppDispatch();

  const handleUpdateDescription = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(updateDescription(description));
  };

  return (
    <div className="channel_video_popup" onClick={(e) => e.stopPropagation()}>
      <div className="channel_video_popup_header">
        <h2>изменить описание</h2>
        <img
          src={cross}
          alt="close"
          className="cahnel_cross cursor_pointer"
          onClick={() => dispatch(toggleFalse())}
        />
      </div>
      <form
        className="channel_video_popup_form"
        onSubmit={handleUpdateDescription}
      >
        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">Описание</label>
          <textarea
            required
            placeholder="описание"
            className="channel_video_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="button_blue channel_video_canel"
          onClick={() => dispatch(toggleFalse())}
        >
          Отмена
        </button>
        <button type="submit" className="button_blue">
          Сохранить описание
        </button>
      </form>
    </div>
  );
};

export default ChannelDescription;
