import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@src/api/AuthApi";
import { toggleFalse } from "../toggleSlice";
import { AuthResponse, KnownError } from "@src/types/main";
import { AppDispatch } from "@src/store/store";

interface User {
  loginText: string;
  password: string;
}

export const login = createAsyncThunk<
  AuthResponse,
  User,
  {
    rejectValue: KnownError;
    dispatch: AppDispatch;
  }
>(
  "user/login",
  async ({ loginText, password }: User, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.login(loginText, password);
      dispatch(toggleFalse());
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const registration = createAsyncThunk<
  AuthResponse,
  User,
  { rejectValue: KnownError; dispatch: AppDispatch }
>(
  "user/registration",
  async ({ loginText, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.registration(loginText, password);
      dispatch(toggleFalse());
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await authApi.logout();
    return {};
  } catch (e) {
    console.log(e.data.message);
  }
});

export const checkAuth = createAsyncThunk("user/checkAuth", async () => {
  try {
    const res = await authApi.refresh();
    return res.data;
  } catch (e) {
    localStorage.removeItem("token");
    console.log(e.data.message);
  }
});
