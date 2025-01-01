import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@src/api/AuthApi";
import chatApi from "@src/api/ChatApi";
import { Chat, KnownError, User } from "@src/types/main";

interface Data {
  chatId: number;
  userId: number;
}

export const getChats = createAsyncThunk<
  Chat[],
  number,
  {
    rejectValue: KnownError;
  }
>("chat/getChats", async (userId, { rejectWithValue }) => {
  try {
    const res = await chatApi.getChats(userId);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const getChat = createAsyncThunk<
  User,
  Data,
  {
    rejectValue: KnownError;
  }
>("chat/getChat", async ({ chatId, userId }, { rejectWithValue }) => {
  try {
    const res = await chatApi.getChat(chatId, userId);
    return res.data.users[0];
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});

export const getUsers = createAsyncThunk<
  User[],
  string,
  {
    rejectValue: KnownError;
  }
>("chat/getUsers", async (login, { rejectWithValue }) => {
  try {
    const res = await authApi.getUsers(login);
    return res.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});
