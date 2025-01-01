import { createAsyncThunk } from "@reduxjs/toolkit";
import ReactionApi from "@src/api/ReactionApi";
import VideoApi from "@src/api/VideoApi";
import { RootState, AppDispatch } from "@src/store/store";
import {
  Comment,
  KnownError,
  ReactionResponse,
  Video,
  VideoResponse,
} from "@src/types/main";

export const getVideos = createAsyncThunk<
  Video[],
  void,
  {
    rejectValue: KnownError;
  }
>("chat/getVideos", async (_, { rejectWithValue }) => {
  try {
    const res = await VideoApi.getVideos();
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const getVideo = createAsyncThunk<
  VideoResponse,
  number,
  {
    rejectValue: KnownError;
  }
>("chat/getVideo", async (videoId, { rejectWithValue }) => {
  try {
    const res = await VideoApi.getVideo(videoId);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const addVideo = createAsyncThunk<
  void,
  FormData,
  {
    rejectValue: KnownError;
  }
>("chat/addVideo", async (data, { rejectWithValue }) => {
  try {
    await VideoApi.addVideo(data);
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const addReaction = createAsyncThunk<
  void,
  { type: string; emotion: number; contentId: number },
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: KnownError;
  }
>(
  "addReaction",
  async (
    { type, emotion, contentId },
    { dispatch, getState, rejectWithValue }
  ) => {
    const userId = getState().userSlice.user.id;

    try {
      await ReactionApi.addReaction(type, contentId, userId, emotion);
      if (type === "video") dispatch(getReaction({ type: "video", contentId }));
      if (type === "comment") dispatch(getReactions());
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const getReaction = createAsyncThunk<
  [ReactionResponse, string],
  { type: string; contentId: number },
  {
    state: RootState;
    rejectValue: KnownError;
  }
>("getReaction", async ({ type, contentId }, { getState, rejectWithValue }) => {
  const userId = getState().userSlice.user.id;
  try {
    const res = await ReactionApi.getReaction(type, contentId, userId);
    return [res.data, type];
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const getReactions = createAsyncThunk<
  ReactionResponse[],
  void,
  {
    state: RootState;
    rejectValue: KnownError;
  }
>("getReactions", async (_, { getState, rejectWithValue }) => {
  const userId = getState().userSlice.user.id;
  try {
    const res = await ReactionApi.getReactions("comment", userId);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const addComment = createAsyncThunk<
  Comment | any,
  string,
  {
    state: RootState;
    rejectValue: KnownError;
  }
>("addComment", async (comment, { getState, rejectWithValue }) => {
  const videoId = getState().videoSlice.currentVideo.id;
  const userId = getState().userSlice.user.id;
  try {
    const res = await VideoApi.createComment(userId, videoId, comment);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});
