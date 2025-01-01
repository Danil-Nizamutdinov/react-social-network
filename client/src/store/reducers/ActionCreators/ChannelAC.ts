import { createAsyncThunk } from "@reduxjs/toolkit";
import ChannelApi from "@src/api/ChannelApi";
import { AppDispatch, RootState } from "@src/store/store";
import { getReaction } from "./VideoAC";
import { CurrentChannel, KnownError } from "@src/types/main";
import { toggleFalse } from "../toggleSlice";

export const getChannel = createAsyncThunk<
  CurrentChannel,
  number,
  {
    rejectValue: KnownError;
  }
>("channel/getChannel", async (channelId, { rejectWithValue }) => {
  try {
    const res = await ChannelApi.getChannel(channelId);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const subscribe = createAsyncThunk<
  void,
  { type: string; channelId: number },
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: KnownError;
  }
>(
  "subscribe",
  async ({ type, channelId }, { dispatch, getState, rejectWithValue }) => {
    const userId = getState().userSlice.user.id;
    try {
      await ChannelApi.subscribe(channelId, userId);
      dispatch(getReaction({ type, contentId: channelId }));
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateDescription = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: KnownError;
  }
>(
  "description",
  async (description, { dispatch, getState, rejectWithValue }) => {
    const channelId = getState().channelSlice.currentChannel.id;
    try {
      await ChannelApi.updateDescription(channelId, description);
      await dispatch(getChannel(channelId));
      dispatch(toggleFalse());
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const updateBackground = createAsyncThunk<
  void,
  File,
  {
    dispatch: AppDispatch;
    state: RootState;
    rejectValue: KnownError;
  }
>("background", async (imgFile, { dispatch, getState, rejectWithValue }) => {
  const channelId = getState().channelSlice.currentChannel.id;
  try {
    const formData = new FormData();
    formData.append("channelId", `${channelId}`);
    formData.append("background", imgFile);

    await ChannelApi.updateBackground(formData);
    await dispatch(getChannel(channelId));
    dispatch(toggleFalse());
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});
