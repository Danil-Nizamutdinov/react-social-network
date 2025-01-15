import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Video,
  VideoResponse,
  Comment,
  ReactionResponse,
} from "@src/types/main";
import { VideoState } from "@src/types/storeTypes";
import {
  addComment,
  getReaction,
  getReactions,
  getVideo,
  getVideos,
  getVideosNextPage,
} from "./ActionCreators/VideoAC";

const initialState: VideoState = {
  video: [],
  currentVideo: null,
  comments: null,
  emotion: "",
  commentReactions: [],
  page: 1,
  totalPages: null,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getVideos.fulfilled,
      (state, action: PayloadAction<VideoResponse>) => {
        state.video = action.payload.videos;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      }
    );
    builder.addCase(
      getVideosNextPage.fulfilled,
      (state, action: PayloadAction<VideoResponse>) => {
        state.video = state.video.concat(action.payload.videos);
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      }
    );
    builder.addCase(
      getVideo.fulfilled,
      (state, action: PayloadAction<VideoResponse>) => {
        state.currentVideo = action.payload.video;
        state.comments = action.payload.comments;
      }
    );
    builder.addCase(
      getReaction.fulfilled,
      (state, action: PayloadAction<[ReactionResponse, string]>) => {
        const [reactionData, reactionType] = action.payload;
        if (reactionType === "video") {
          state.emotion = reactionData
            ? reactionData.emotion === 1
              ? "like"
              : "dislike"
            : "";
        }
      }
    );
    builder.addCase(
      getReactions.fulfilled,
      (state, action: PayloadAction<ReactionResponse[]>) => {
        state.commentReactions = action.payload;
      }
    );
    builder.addCase(
      addComment.fulfilled,
      (state, action: PayloadAction<Comment>) => {
        state.comments.push(action.payload);
      }
    );
  },
});

export const {} = videoSlice.actions;

export default videoSlice.reducer;
