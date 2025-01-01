import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getChat, getChats, getUsers } from "./ActionCreators/ChatAC";
import { ChatState } from "@src/types/storeTypes";
import { Chat, User } from "@src/types/main";

const initialState: ChatState = {
  chats: [],
  chat: null,
  searchContacts: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getChats.fulfilled,
      (state, action: PayloadAction<Chat[]>) => {
        state.chats = action.payload;
      }
    );
    builder.addCase(getChat.fulfilled, (state, action: PayloadAction<User>) => {
      state.chat = action.payload;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.searchContacts = action.payload;
      }
    );
  },
});

export const {} = chatSlice.actions;

export default chatSlice.reducer;
