import React, { useState } from "react";
import cross from "@src/assets/cross.png";
import { useAppDispatch } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { updateBackground } from "@src/store/reducers/ActionCreators/ChannelAC";

const ChannelBackground: React.FC = () => {
  const [imgFile, setImgFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const handleUpdateBackground = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    dispatch(updateBackground(imgFile));
  };

  return (
    <div className="channel_video_popup" onClick={(e) => e.stopPropagation()}>
      <div className="channel_video_popup_header">
        <h2>изменить background</h2>
        <img
          src={cross}
          alt="close"
          className="cahnel_cross"
          onClick={() => dispatch(toggleFalse())}
        />
      </div>
      <form
        className="channel_video_popup_form"
        onSubmit={handleUpdateBackground}
      >
        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">background</label>
          <input
            type="file"
            required
            className="file_input"
            onChange={(e) => setImgFile(e.target.files[0])}
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
          Изменить
        </button>
      </form>
    </div>
  );
};

export default ChannelBackground;
