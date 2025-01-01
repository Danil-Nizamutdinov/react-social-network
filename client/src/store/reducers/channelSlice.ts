import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChannelState } from "@src/types/storeTypes";
import { getChannel } from "./ActionCreators/ChannelAC";
import { getReaction } from "./ActionCreators/VideoAC";
import { CurrentChannel, ReactionResponse } from "@src/types/main";

const initialState: ChannelState = {
  currentChannel: null,
  isSubscribe: false,
};

export const channelSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getChannel.fulfilled,
      (state, action: PayloadAction<CurrentChannel>) => {
        state.currentChannel = action.payload;
      }
    );
    builder.addCase(
      getReaction.fulfilled,
      (state, action: PayloadAction<[ReactionResponse, string]>) => {
        const [reactionData, reactionType] = action.payload;
        if (reactionType === "channel") {
          state.isSubscribe = reactionData ? true : false;
        }
      }
    );
  },
});

export const {} = channelSlice.actions;

export default channelSlice.reducer;
