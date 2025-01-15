import React, { useState } from "react";
import cross from "@src/assets/cross.png";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { toggleFalse } from "@src/store/reducers/toggleSlice";
import { addVideo } from "@src/store/reducers/ActionCreators/VideoAC";
import { getChannel } from "@src/store/reducers/ActionCreators/ChannelAC";

const AddVideo: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const currentChannel = useAppSelector(
    (state) => state.channelSlice.currentChannel
  );

  const dispatch = useAppDispatch();

  const handleButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !imgFile ||
      !videoFile ||
      description === "" ||
      title === "" ||
      !currentChannel.id
    ) {
      return alert("не все поля заполнены");
    }

    const formData = new FormData();
    formData.append("channelId", `${currentChannel.id}`);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("preview", imgFile);

    await dispatch(addVideo(formData));
    await dispatch(getChannel(currentChannel.id));
    dispatch(toggleFalse());
  };

  return (
    <div className="channel_video_popup" onClick={(e) => e.stopPropagation()}>
      <div className="channel_video_popup_header">
        <h2>Добавить видео</h2>
        <img
          src={cross}
          alt="close"
          className="cahnel_cross cursor_pointer"
          onClick={() => dispatch(toggleFalse())}
        />
      </div>

      <form className="channel_video_popup_form" onSubmit={handleButton}>
        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">Video File</label>
          <input
            type="file"
            accept="video/*"
            required
            className="file_input"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
        </div>

        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">Preview File</label>
          <input
            type="file"
            accept="video/*"
            required
            className="file_input"
            onChange={(e) => setImgFile(e.target.files[0])}
          />
        </div>

        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">Title</label>
          <input
            type="text"
            required
            placeholder="Enter video title"
            className="login_input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="channel_video_popup_form_item">
          <label className="channel_video_label">Description</label>
          <textarea
            required
            placeholder="Enter video description"
            className="channel_video_textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="channel_video_popup_form_item">
          <button
            type="button"
            className="button_blue channel_video_canel"
            onClick={() => dispatch(toggleFalse())}
          >
            Отмена
          </button>
          <button type="submit" className="button_blue">
            Добавить видео
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideo;
